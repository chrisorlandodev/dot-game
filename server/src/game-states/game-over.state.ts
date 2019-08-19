import { DotGameEngine } from '../dot-game.engine';
import { GameMessage } from '../entities/game-message';
import { Point } from '../entities/point';
import { DotGameState } from './dot-game.state';

/**
 * Handles the state of the game when the game is over
 */
export class GameOverState implements DotGameState {
  constructor(private readonly dotGame: DotGameEngine) {}

  selectPoint(point: Point): GameMessage {
    const heading = this.heading();
    const message = 'Refresh to play again.';
    return GameMessage.UpdateText(heading, message);
  }

  timeout(): GameMessage {
    const heading = this.heading();
    return GameMessage.UpdateText(heading, "Refresh to play again. I'm waiting!");
  }

  private heading() {
    return `This Game is Over - ${this.dotGame.currentPlayer().name} Won!`;
  }
}
