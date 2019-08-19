import { Game } from './dot-game';
import { GameMessage } from './entities/game-message';

describe('DotGame', () => {
  function out(message: GameMessage) {
    console.log(message);
  }

  it('should initialize the game and expose a request handler', () => {
    const game = new Game(4, 4, out);
    expect(game.request).toBeTruthy();
    expect(game.init).toBeTruthy();
  });
});
