import { LineSegment } from './line-segment';
import { Point } from './point';

export class LineOutput {
  public readonly start: Point;
  public readonly end: Point;

  constructor(line: LineSegment) {
    this.start = line.startPoint;
    this.end = line.endPoint;
  }
}
