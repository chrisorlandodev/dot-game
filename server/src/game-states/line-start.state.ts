import { DotGameEngine } from '../dot-game.engine';
import { GameMessage } from '../entities/game-message';
import { Point } from '../entities/point';
import { DotGameState } from './dot-game.state';

/**
 * Handles the state of the game when a starting point of a line is to be selected
 */
export class LineStartState implements DotGameState {
  constructor(private dotGame: DotGameEngine) {}

  selectPoint(point: Point): GameMessage {
    const currentPlayerName = this.dotGame.currentPlayer().name;

    if (!this.dotGame.isPointOnBoard(point)) {
      const message = `${point.name} is not a valid dot on the board!`;
      return GameMessage.InvalidStartNode(currentPlayerName, message);
    }

    /**
     * A valid start Point is determined by whether if the Point is on the board, and
     * if it is an endpoint of the path when there are endpoints available.
     */
    const isValidStartPoint =
      this.dotGame.isPointOnBoard(point) &&
      (!this.dotGame.path.hasEndPoints() || this.dotGame.path.isEndPoint(point));

    if (isValidStartPoint) {
      this.dotGame.gameState = this.dotGame.nextLineEndState;
      this.dotGame.startLinePoint = point;
      return GameMessage.ValidStartNode(currentPlayerName, '');
    } else {
      return GameMessage.InvalidStartNode(currentPlayerName);
    }
  }

  timeout(): GameMessage {
    const message = "Let's get the show on the road. Start a new line at any time.";
    return GameMessage.UpdateText(this.dotGame.currentPlayer().name, message);
  }
}
