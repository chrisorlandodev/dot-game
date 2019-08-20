import { DotGameLog, DotGameLogInterface } from './dot-game.log';
import { GameMessage } from './entities/game-message';
import { GameMessageType } from './entities/game-message.type';
import { LineSegment } from './entities/line-segment';
import { Player } from './entities/player';
import { Point } from './entities/point';
import { DotGameState } from './game-states/dot-game.state';
import { GameOverState } from './game-states/game-over.state';
import { LineEndState } from './game-states/line-end.state';
import { LineStartState } from './game-states/line-start.state';
import { PathTracker } from './path-tracker';
import { NewLineValidator } from './validators/new-line.validator';

/**
 * The game engine
 */
export class DotGameEngine {
  public readonly lineStartState: DotGameState;
  public readonly nextLineEndState: DotGameState;
  public readonly gameOverState: DotGameState;

  /**
   * The Players of the game
   */
  private players: Player[] = [];

  /**
   * Path tracker
   */
  private _path: PathTracker = new PathTracker();

  get path() {
    return this._path;
  }

  /**
   * Reference to the timeout message
   */
  private _timeoutMessage?: number | null;

  /**
   * Holds the state of the game
   */
  private _gameState: DotGameState;

  /**
   * Set the game set
   *
   * @param state
   */
  set gameState(state: DotGameState) {
    DotGameLog.debug('Game State: ' + state.constructor.name);
    this._gameState = state;
  }

  /**
   * The current player's index number in the players array
   */
  private _currentPlayerNumber = 0; // Player 1 always starts

  // Keeps track of the current players starting line Point
  public startLinePoint!: Point;

  /**
   * Create a new DotGame
   *
   * @param boardWidth
   * @param boardHeight
   * @param out
   * @param logger
   */
  constructor(
    private boardWidth: number = 4,
    private boardHeight: number = 4,
    private out: any,
    logger?: DotGameLogInterface
  ) {
    if (!logger) {
      DotGameLog.setLogger(console);
    }

    // Create Players
    for (let i = 0; i < 2; i++) {
      const playerName = 'Player ' + (i + 1); // player 0
      this.players.push(new Player(playerName));
    }

    this.lineStartState = new LineStartState(this);
    this.nextLineEndState = new LineEndState(this);
    this.gameOverState = new GameOverState(this);
    this._gameState = this.lineStartState;

    DotGameLog.debug('');
    DotGameLog.debug('-------------------');
    DotGameLog.debug('DotGame constructed');
    DotGameLog.debug('-------------------');
  }

  /**
   * Change the player's turns
   */
  public changePlayersTurn() {
    this._currentPlayerNumber++;
    if (this._currentPlayerNumber === this.players.length) {
      this._currentPlayerNumber = 0;
    }
  }

  /**
   * Send a message when the player takes too long to perform an action.
   *
   * Clears any existing timeout message prior to setting a new timeout message
   */
  public timeoutMessage() {
    // Clear any timeout message that is waiting to be sent
    this.clearTimoutMessage();
    // Send a timeout message X secs after a node is selected
    // @ts-ignore
    this._timeoutMessage = setTimeout(() => {
      this.send(this._gameState.timeout());
    }, 5000);
  }

  /**
   * Clear an existing timeout message if one exists
   */
  public clearTimoutMessage() {
    if (this._timeoutMessage) {
      clearTimeout(this._timeoutMessage);
      this._timeoutMessage = null;
    }
  }

  /**
   * Initialize a new game by resetting the game state
   */
  initGame() {
    this._gameState = this.lineStartState;
    this._currentPlayerNumber = 0;
    this._path = new PathTracker();
    const playerName = this.currentPlayer().name;
    this.timeoutMessage();
    DotGameLog.debug('New Game Initialized');
    this.send(GameMessage.Initialize(playerName, `Awaiting ${playerName}'s Move`));
  }

  /**
   * Checks if a Point is on the board.
   *
   * @param point
   */
  isPointOnBoard(point: Point): boolean {
    return point.x >= 0 && point.x < this.boardWidth && point.y >= 0 && point.y < this.boardHeight;
  }

  /**
   * Gets the current Player
   */
  currentPlayer() {
    return this.players[this._currentPlayerNumber];
  }

  /**
   * Get the other player who is waiting for their turn
   */
  waitingPlayer() {
    if (this._currentPlayerNumber === 0) {
      return this.players[1];
    } else {
      return this.players[0];
    }
  }

  /**
   * Check if there is at least one valid move.
   *
   * If the head point or tail point of the path has any valid lines that can be formed to
   * an adjacent point on the board, then there is a move available.
   */
  isMoveAvailable() {
    const endPoints = [this.path.headPoint(), this.path.tailPoint()];
    const lineValidator = new NewLineValidator(this.path);
    for (const endPoint of endPoints) {
      const adjacentPoints = this.getAdjacentPoints(endPoint);
      for (const adjacentPoint of adjacentPoints) {
        const line = new LineSegment(endPoint, adjacentPoint);
        if (lineValidator.isValid(line)) {
          DotGameLog.debug('Valid move available: ' + line.name);
          return true;
        }
      }
    }
    DotGameLog.debug('No move is available!');
    return false;
  }

  /**
   * Get the adjacent points on the board
   *
   * @param point
   */
  getAdjacentPoints(point: Point): Point[] {
    const points: Point[] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        const p = new Point(point.x + x, point.y + y);
        if (this.isPointOnBoard(p) && !point.is(p)) {
          points.push(p);
        }
      }
    }
    return points;
  }

  /**
   * Game request handler
   *
   * @param messageJSON
   */
  request(messageJSON: any) {
    DotGameLog.debug(messageJSON);

    // Send a message when the player takes too long to perform an action
    this.timeoutMessage();

    const message = JSON.parse(messageJSON);
    switch (message.msg) {
      case GameMessageType.Initialize:
        this.initGame();
        break;
      case GameMessageType.NodeClicked:
        const point = new Point(message.body.x, message.body.y);
        this.send(this._gameState.selectPoint(point));
        break;
      case GameMessageType.Error:
        const outMsg = 'What would you like me to do about it? Refresh if you got a problem.';
        this.send(GameMessage.UpdateText(this.currentPlayer().name, outMsg));
    }
  }

  /**
   * Respond to the client
   *
   * @param message
   */
  send(message: GameMessage) {
    DotGameLog.debug(message);
    this.out(message);
  }
}
