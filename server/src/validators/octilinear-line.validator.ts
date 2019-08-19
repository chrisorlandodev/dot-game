import { LineSegment } from '../entities/line-segment';
import { Geometry } from '../geometry/geometry';
import { LineType } from '../geometry/line-type';

export class OctilinearLineValidator {
  /**
   * Check if a line is horizontal, vertical or 45-degrees
   *
   * @param line
   */
  isValid(line: LineSegment) {
    return Geometry.lineType(line) !== LineType.Invalid;
  }
}
