import { LineSegment } from '../entities/line-segment';
import { Point } from '../entities/point';
import { OctilinearLineValidator } from './octilinear-line.validator';

describe('isValid()', () => {
  it('should describe the line type', () => {
    const validator = new OctilinearLineValidator();

    const horizontalLine = new LineSegment(new Point(0, 0), new Point(1, 0));
    expect(validator.isValid(horizontalLine)).toBeTruthy();

    const verticalLine = new LineSegment(new Point(0, 0), new Point(0, 1));
    expect(validator.isValid(verticalLine)).toBeTruthy();

    const diagonalLine = new LineSegment(new Point(0, 0), new Point(1, 1));
    expect(validator.isValid(diagonalLine)).toBeTruthy();

    const notOctilinearLine = new LineSegment(new Point(0, 0), new Point(2, 3));
    expect(validator.isValid(notOctilinearLine)).toBeFalsy();

    const notALine = new LineSegment(new Point(1, 1), new Point(1, 1));
    expect(validator.isValid(notALine)).toBeFalsy();
  });
});
