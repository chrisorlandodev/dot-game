import { GameMessage } from '../entities/game-message';
import { Point } from '../entities/point';

export interface DotGameState {
  selectPoint(point: Point): GameMessage;

  timeout(): GameMessage;
}
