import { DotGameEngine } from './dot-game.engine';
import { DotGameLogInterface } from './dot-game.log';

/**
 * DotGame
 *
 * Exposes a the DotGame's request handler and initializes the game engine
 */
export class DotGame {
  private game: DotGameEngine;

  constructor(
    private boardWidth: number = 4,
    private boardHeight: number = 4,
    private out: any,
    logger?: DotGameLogInterface
  ) {
    this.game = new DotGameEngine(boardWidth, boardHeight, out, logger);
    this.game.initGame();
  }

  request(messageJSON: any) {
    this.game.request(messageJSON);
  }
}
