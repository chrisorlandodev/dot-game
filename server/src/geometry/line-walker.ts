import { LineSegment } from '../entities/line-segment';
import { Point } from '../entities/point';
import { InvalidLineTypeException } from '../exceptions/invalid-line-type.exception';
import { LineType } from './line-type';
import { Geometry } from './geometry';

/**
 * Iterates (walks the line) over the integer points of the line.
 */
export class LineWalker {
  /**
   * Johnny Cash - I Walk the Line
   * ---------------------------------------------
   * I keep a close watch on this heart of mine
   * I keep my eyes wide open all the time
   * I keep the ends out for the tie that binds
   * Because you're mine, I walk the line
   *
   * I find it very, very easy to be true
   * I find myself alone when each day's through
   * Yes, I'll admit that I'm a fool for you
   * Because you're mine, I walk the line
   *
   * As sure as night is dark and day is light
   * I keep you on my mind both day and night
   * And happiness I've known proves that it's right
   * Because you're mine, I walk the line
   *
   * You've got a way to keep me on your side
   * You give me cause for love that I can't hide
   * For you I know I'd even try to turn the tide
   * Because you're mine, I walk the line
   *
   * I keep a close watch on this heart of mine
   * I keep my eyes wide open all the time
   * I keep the ends out for the tie that binds
   * Because you're mine, I walk the line
   *
   * https://www.youtube.com/watch?v=jh169rVMveA
   */

  /**
   *
   * @param line
   */
  static walkTheLine(line: LineSegment): IterableIterator<Point> {
    const lineType = Geometry.lineType(line);
    switch (lineType) {
      case LineType.Horizontal:
        return LineWalker.doWalkHorizontal(line);
      case LineType.Vertical:
        return LineWalker.doWalkVertical(line);
      // return LineWalker.walkNonDiagonal(line, lineType);
      case LineType.Diagonal:
        return LineWalker.walkDiagonal(line);
      case LineType.Invalid:
        throw new InvalidLineTypeException('Cannot walk an invalid line');
    }
  }

  private static *walkDiagonal(line: LineSegment): IterableIterator<Point> {
    const pointA = line.startPoint;
    const pointB = line.endPoint;

    const leftX = pointA.x;
    const rightX = pointB.x;
    const xDirection: number = rightX < leftX ? -1 : 1; // left vs right
    const yDirection: number = pointB.y < pointA.y ? -1 : 1; // up vs down

    // Amount of distance to travel
    const distanceToTravel = Math.abs(leftX - rightX);

    for (let i = 0; i <= distanceToTravel; i++) {
      const x = pointA.x + xDirection * i;
      const y = pointA.y + yDirection * i;
      yield new Point(x, y);
    }
  }

  private static *doWalkHorizontal(line: LineSegment): IterableIterator<Point> {
    const pointA = line.startPoint;
    const pointB = line.endPoint;

    // Walk the points along the X-axis
    const yAxis = pointA.y;
    const beginX = pointA.x;
    const endX = pointB.x;
    const diff = Math.abs(endX - beginX);
    const direction = beginX < endX ? 1 : -1;
    for (let i = 0; i <= diff; i++) {
      const x = beginX + i * direction;
      yield new Point(x, yAxis);
    }
  }

  private static *doWalkVertical(line: LineSegment): IterableIterator<Point> {
    const pointA = line.startPoint;
    const pointB = line.endPoint;
    // Walk the points along the X-axis
    const xAxis = pointA.x;
    const beginY = pointA.y;
    const endY = pointB.y;
    const diff = Math.abs(endY - beginY);
    const direction = beginY < endY ? 1 : -1;
    for (let i = 0; i <= diff; i++) {
      const y = beginY + i * direction;
      yield new Point(xAxis, y);
    }
  }
}
