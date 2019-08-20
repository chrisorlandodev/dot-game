import { LineSegment } from '../entities/line-segment';
import { Point } from '../entities/point';
import { ParallelLinesException } from '../exceptions/parallel-lines.exception';
import { LineType } from './line-type';

export class Geometry {
  /**
   * Determine if a value is between (inclusive) of two other values
   *
   * @param check
   * @param start
   * @param end
   */
  private static isBetween(check: number, start: number, end: number): boolean {
    if (start > end) {
      const temp = start;
      start = end;
      end = temp;
    }
    return start <= check && check <= end;
  }

  /**
   * Check if a Point is on a Line Segment
   *
   * @param checkPoint
   * @param line
   */
  static isPointOnLineSegment(checkPoint: Point, line: LineSegment): boolean {
    const startPoint: Point = line.startPoint;
    const endPoint: Point = line.endPoint;

    if (checkPoint.is(startPoint) || checkPoint.is(endPoint)) {
      return true;
    }

    const slopeOfStartCheck = (startPoint.x - checkPoint.x) / (startPoint.y - checkPoint.y);
    const slopeOfCheckEnd = (checkPoint.x - endPoint.x) / (checkPoint.y - endPoint.y);

    // If the slopes are different, then the Check point is not on the infinite line
    const isSameSlope = slopeOfStartCheck === slopeOfCheckEnd;
    if (!isSameSlope) {
      return false;
    }

    const isWithinXBounds = Geometry.isBetween(checkPoint.x, startPoint.x, endPoint.x);
    const isWithinYBounds = Geometry.isBetween(checkPoint.y, startPoint.y, endPoint.y);
    return isWithinXBounds && isWithinYBounds;
  }

  /**
   * Checks if two line segments are parallel
   *
   * @param line1
   * @param line2
   */
  static areLinesParallel(line1: LineSegment, line2: LineSegment) {
    try {
      // Throws a ParallelLinesException if the lines are parallel
      Geometry.findIntersectionOfLines(line1, line2);
      return false;
    } catch (e) {
      if (e instanceof ParallelLinesException) {
        // lines are parallel
        return true;
      }
      throw e;
    }
  }

  /**
   * Check whether two line segments touch with each other
   *
   * @param line1
   * @param line2
   */
  static doLineSegmentsTouch(line1: LineSegment, line2: LineSegment): boolean {
    try {
      // If any endpoint is on the other line than they touch.
      if (
        Geometry.isPointOnLineSegment(line1.startPoint, line2) ||
        Geometry.isPointOnLineSegment(line1.endPoint, line2) ||
        Geometry.isPointOnLineSegment(line2.startPoint, line1) ||
        Geometry.isPointOnLineSegment(line2.endPoint, line1)
      ) {
        return true;
      }

      const intersectionPoint = Geometry.findIntersectionOfLines(line1, line2);
      const intersectsOnLine1 = Geometry.isPointOnLineSegment(intersectionPoint, line1);
      const intersectsOnLine2 = Geometry.isPointOnLineSegment(intersectionPoint, line2);
      return intersectsOnLine1 && intersectsOnLine2;
    } catch (e) {
      if (e instanceof ParallelLinesException) {
        // lines are parallel and they do not touch as per above check
        return false;
      }
      throw e;
    }
  }

  /**
   * Find the intersection of two Line segments as if they were infinite lines
   *
   * Courtesy of https://rosettacode.org/wiki/Find_the_intersection_of_two_lines#C.23
   *
   * @param line1
   * @param line2
   * @throws ParallelLinesException
   */
  static findIntersectionOfLines(line1: LineSegment, line2: LineSegment): Point {
    // Starting point of first line
    const s1 = line1.startPoint;
    // Ending point of first line
    const e1 = line1.endPoint;
    // Starting point of second line
    const s2 = line2.startPoint;
    // Ending point of second line
    const e2 = line2.endPoint;

    const a1 = e1.y - s1.y;
    const b1 = s1.x - e1.x;
    const c1 = a1 * s1.x + b1 * s1.y;

    const a2 = e2.y - s2.y;
    const b2 = s2.x - e2.x;
    const c2 = a2 * s2.x + b2 * s2.y;

    const delta = a1 * b2 - a2 * b1;
    // When delta is 0 the lines are parallel.
    if (delta === 0) {
      throw new ParallelLinesException('Lines do not intersect!');
    } else {
      return new Point((b2 * c1 - b1 * c2) / delta, (a1 * c2 - a2 * c1) / delta);
    }
  }

  /**
   * Determines if the line segment is horizontal, vertical or diagonal (45-degrees)
   *
   * @param line
   */
  static lineType(line: LineSegment): LineType {
    const startPoint = line.startPoint;
    const endPoint = line.endPoint;

    // A line must go somewhere
    if (startPoint.x === endPoint.x && startPoint.y === endPoint.y) {
      return LineType.Invalid;
    }

    const diffX = Math.abs(startPoint.x - endPoint.x);
    const diffY = Math.abs(startPoint.y - endPoint.y);

    // Vertical line - no change in X must be going up or down
    const isVerticalLine = diffX === 0 && diffY !== 0;
    if (isVerticalLine) {
      return LineType.Vertical;
    }

    // Horizontal line - no change in Y must be going left or right
    const isHorizontalLine = diffY === 0 && diffX !== 0;
    if (isHorizontalLine) {
      return LineType.Horizontal;
    }

    // Diagonal line @ 45-degrees
    const isDiagonal = diffX === diffY;
    if (isDiagonal) {
      return LineType.Diagonal;
    }

    // If it's not horizontal, vertical or at a 45-degree angle, it's invalid for this game.
    return LineType.Invalid;
  }
}
