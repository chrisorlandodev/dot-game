import { LineWalker } from '../geometry/line-walker';
import { Point } from './point';

export class LineSegment {
  private readonly _startPoint: Point;
  get startPoint() {
    return this._startPoint;
  }

  private readonly _endPoint: Point;

  get endPoint() {
    return this._endPoint;
  }

  constructor(startPoint: Point, endPoint: Point) {
    this._endPoint = endPoint;
    this._startPoint = startPoint;
  }

  // Accessors

  get name() {
    return `${this._startPoint.name}-${this._endPoint.name},`;
  }

  toString() {
    return 'Line of ' + this.name;
  }

  /**
   * Get the points that this line visits
   */
  points() {
    const points: Point[] = [];
    const iterator = LineWalker.walkTheLine(this);
    let pointResult: IteratorResult<Point>;

    while (true) {
      pointResult = iterator.next();
      if (pointResult.done) {
        break;
      }
      points.push(pointResult.value);
    }
    return points;
  }

  /**
   * Get a new reversed line by swapping the endpoints
   */
  asFlipped() {
    return new LineSegment(this.endPoint, this.startPoint);
  }
}
