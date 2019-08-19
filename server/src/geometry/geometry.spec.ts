import { LineSegment } from '../entities/line-segment';
import { Point } from '../entities/point';
import { Geometry } from './geometry';
import { LineType } from './line-type';

describe('Geometry', () => {
  describe('isPointOnSegment()', () => {
    it('should be TRUE when Check Point is on the Start Point', () => {
      // Assemble
      const checkPoint = new Point(1, 1);
      const startPoint = new Point(1, 1);
      const endPoint = new Point(3, 3);
      // Act
      const result = Geometry.isPointOnLineSegment(
        checkPoint,
        new LineSegment(startPoint, endPoint)
      );
      // Assert
      expect(result).toBeTruthy();
    });

    it('should be TRUE when Check Point is on the End Point', () => {
      // Assemble
      const checkPoint = new Point(3, 3);
      const startPoint = new Point(1, 1);
      const endPoint = new Point(3, 3);
      // Act
      const result = Geometry.isPointOnLineSegment(
        checkPoint,
        new LineSegment(startPoint, endPoint)
      );
      // Assert
      expect(result).toBeTruthy();
    });

    it('should be TRUE when Check Point is on the line segment', () => {
      // Assemble
      const checkPoint = new Point(2, 2);
      const startPoint = new Point(1, 1);
      const endPoint = new Point(3, 3);
      // Act
      const result = Geometry.isPointOnLineSegment(
        checkPoint,
        new LineSegment(startPoint, endPoint)
      );
      // Assert
      expect(result).toBeTruthy();
    });

    it('should be FALSE when Check Point is NOT on the line segment', () => {
      // Assemble
      const startPoint = new Point(1, 1);
      const endPoint = new Point(3, 1);
      const checkPoint = new Point(3, 3);
      // Act
      const result = Geometry.isPointOnLineSegment(
        checkPoint,
        new LineSegment(startPoint, endPoint)
      );
      // Assert
      expect(result).toBeFalsy();
    });
  });

  describe('doLineSegmentsTouch()', () => {
    it('should return TRUE if lines touch', () => {
      const lineSegment = new LineSegment(new Point(0, 0), new Point(2, 2));
      const checkLine = new LineSegment(new Point(0, 2), new Point(2, 0));
      const result2 = Geometry.doLineSegmentsTouch(lineSegment, checkLine);
      expect(result2).toBeTruthy();
    });

    it('should return TRUE if parallel lines touch', () => {
      const lineSegment = new LineSegment(new Point(1, 2), new Point(0, 3));
      const checkLine = new LineSegment(new Point(1, 2), new Point(2, 1));
      const result = Geometry.doLineSegmentsTouch(lineSegment, checkLine);
      expect(result).toBeTruthy();
    });

    it('should return FALSE if parallel lines DO NOT touch', () => {
      const lineSegment = new LineSegment(new Point(1, 1), new Point(2, 2));
      const checkLine = new LineSegment(new Point(3, 3), new Point(4, 4));
      const result = Geometry.doLineSegmentsTouch(lineSegment, checkLine);
      expect(result).toBeFalsy();
    });
  });
  describe('doLineSegmentsTouch()', () => {
    it('should return TRUE if lines are parallel', () => {
      const lineSegment = new LineSegment(new Point(1, 1), new Point(2, 2));
      const checkLine = new LineSegment(new Point(3, 3), new Point(4, 4));
      const result = Geometry.areLinesParallel(lineSegment, checkLine);
      expect(result).toBeTruthy();
    });

    it('should return FALSE if lines are NOT parallel', () => {
      const lineSegment = new LineSegment(new Point(1, 1), new Point(2, 2));
      const checkLine = new LineSegment(new Point(1, 1), new Point(0, 1));
      const result = Geometry.areLinesParallel(lineSegment, checkLine);
      expect(result).toBeFalsy();
    });
  });

  describe('lineType()', () => {
    it('should describe the line type', () => {
      const horizontalLine = new LineSegment(new Point(0, 0), new Point(1, 0));
      expect(Geometry.lineType(horizontalLine)).toBe(LineType.Horizontal);

      const verticalLine = new LineSegment(new Point(0, 0), new Point(0, 1));
      expect(Geometry.lineType(verticalLine)).toBe(LineType.Vertical);

      const diagonalLine = new LineSegment(new Point(0, 0), new Point(1, 1));
      expect(Geometry.lineType(diagonalLine)).toBe(LineType.Diagonal);

      const notOctilinearLine = new LineSegment(new Point(0, 0), new Point(2, 3));
      expect(Geometry.lineType(notOctilinearLine)).toBe(LineType.Invalid);

      const notALine = new LineSegment(new Point(1, 1), new Point(1, 1));
      expect(Geometry.lineType(notALine)).toBe(LineType.Invalid);
    });
  });
});
