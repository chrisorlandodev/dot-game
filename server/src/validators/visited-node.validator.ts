import { DotGameLog } from '../dot-game.log';
import { LineSegment } from '../entities/line-segment';
import { PathTracker } from '../path-tracker';

/**
 * Validates if the line segment
 */
export class VisitedNodeValidator {
  constructor(private path: PathTracker) {}

  /**
   * Checks whether a NEW line does not visit another already visited node on the path;
   * other than its own starting point.
   *
   * @param line
   */
  isNewLineValid(line: LineSegment) {
    const linePoints = line.points();
    for (const linePoint of linePoints) {
      // Skip starting point
      if (line.startPoint.is(linePoint)) {
        continue;
      }
      for (const point of this.path.visitedPoints) {
        if (linePoint.is(point)) {
          DotGameLog.info(line.name + 'touches visited ' + point);
          return false;
        }
      }
    }
    return true;
  }
}
