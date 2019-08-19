import { DotGameLog } from '../dot-game.log';
import { LineSegment } from '../entities/line-segment';
import { Geometry } from '../geometry/geometry';
import { PathTracker } from '../path-tracker';
import { OctilinearLineValidator } from './octilinear-line.validator';
import { VisitedNodeValidator } from './visited-node.validator';

/**
 * Validates if a new line is a valid line
 *
 * A new line:
 * - Must be an Octilinear line
 * - AND If a path exists:
 *    - Must start at the head or tail of the path (i.e. endpoints of the path)
 *    - AND Cannot visit another visited node (other than it's starting point)
 *    - AND May not touch another line touch other than the line it was continued from
 *           - can't intersect (i.e.: can't touch more than one line)
 */
export class NewLineValidator {
  private readonly octilinearLineValidator: OctilinearLineValidator;
  private readonly visitedNodeValidator: VisitedNodeValidator;

  constructor(private readonly path: PathTracker) {
    this.octilinearLineValidator = new OctilinearLineValidator();
    this.visitedNodeValidator = new VisitedNodeValidator(path);
  }

  isValid(line: LineSegment) {
    // - Must be an Octilinear line
    if (!this.octilinearLineValidator.isValid(line)) {
      return false;
    }

    // - If a path exists
    if (this.path.hasEndPoints()) {
      // - Must start at the head or tail of the path
      if (!this.path.isEndPoint(line.startPoint)) {
        return false;
      }

      // - May not touch another line touch

      if (!this.visitedNodeValidator.isNewLineValid(line)) {
        return false;
      }

      // It's implied that the new line is touching a point on the path by the check above

      let totalTouchingLines = 0;
      for (const checkLine of this.path.lines) {
        if (Geometry.doLineSegmentsTouch(line, checkLine)) {
          totalTouchingLines++;
          // The 1 line would be the from the continuation of the path
          if (totalTouchingLines > 1) {
            return false;
          }
        }
      }
    }

    return true;
  }
}
