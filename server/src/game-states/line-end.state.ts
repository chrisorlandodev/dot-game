import { DotGameEngine } from '../dot-game.engine';
import { GameMessage } from '../entities/game-message';

import { LineSegment } from '../entities/line-segment';
import { Point } from '../entities/point';
import { NewLineValidator } from '../validators/new-line.validator';
import { DotGameState } from './dot-game.state';

/**
 * Handles the state of the game when a ending point of a line is to be selected
 *
 * After a line is played, the game checks if the game can proceed.
 */
export class LineEndState implements DotGameState {
  constructor(private dotGame: DotGameEngine) {}

  /**
   *
   * @param point
   */
  selectPoint(point: Point): GameMessage {
    const line = new LineSegment(this.dotGame.startLinePoint, point);
    const lineValidator = new NewLineValidator(this.dotGame.path);
    const currentPlayerName = this.dotGame.currentPlayer().name;

    if (point.is(this.dotGame.startLinePoint) || !lineValidator.isValid(line)) {
      this.dotGame.gameState = this.dotGame.lineStartState;
      return GameMessage.InvalidEndNode(currentPlayerName);
    }

    this.dotGame.path.addLine(line);

    /*
     * -----------------
     * Game Ending Rules
     * -----------------
     * The game ends when no valid lines can be drawn.
     * The player who draws the last line is the loser. (Making the other player the winner)
     */

    // Change players - It's either the next players move, or the next player wins.
    this.dotGame.changePlayersTurn();
    const nextPlayerName = this.dotGame.currentPlayer().name;

    /*
     * If there are still moves available, it becomes the next player's turn to start a new line.
     * Otherwise, it's Game Over!
     */
    if (this.dotGame.isMoveAvailable()) {
      // Reset the state of the game to Line Start State
      this.dotGame.gameState = this.dotGame.lineStartState;
      return GameMessage.ValidEndNode(nextPlayerName, '', line);
    } else {
      // Game Over
      this.dotGame.gameState = this.dotGame.gameOverState;
      this.dotGame.clearTimoutMessage();
      const heading = nextPlayerName + ' Wins!';
      const message = `Sorry ${currentPlayerName}, you lost! Refresh to play again.`;
      return GameMessage.GameOver(heading, message, line);
    }
  }

  timeout(): GameMessage {
    const message = "Finish that line...if it's not too much trouble!";
    return GameMessage.UpdateText(this.dotGame.currentPlayer().name, message);
  }
}
