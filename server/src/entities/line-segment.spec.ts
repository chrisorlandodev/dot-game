import { LineSegment } from './line-segment';
import { Point } from './point';

describe('LineSegment', () => {
  describe('startPoint accessor', () => {
    it('should return the starting point (forwards)', () => {
      const line = new LineSegment(new Point(1, 1), new Point(3, 1));
      const point = line.startPoint;
      expect(point).toEqual(new Point(1, 1));
    });

    it('should return the starting point (backwards)', () => {
      const line = new LineSegment(new Point(3, 1), new Point(1, 1));
      const point = line.startPoint;
      expect(point).toEqual(new Point(3, 1));
    });
  });

  describe('endPoint accessor', () => {
    it('should return the ending point (descending)', () => {
      const line = new LineSegment(new Point(1, 1), new Point(3, 1));
      const point = line.endPoint;
      expect(point).toEqual(new Point(3, 1));
    });

    it('should return the ending point (ascending)', () => {
      const line = new LineSegment(new Point(3, 1), new Point(1, 1));
      const point = line.endPoint;
      expect(point).toEqual(new Point(1, 1));
    });
  });

  describe('points()', () => {
    it('should return the points on the line segment', () => {
      // Assemble
      // > Forwards
      const lineF = new LineSegment(new Point(1, 1), new Point(3, 1));
      // < Backwards
      const lineB = new LineSegment(new Point(3, 1), new Point(1, 1));
      // Act
      const pointsF = lineF.points();
      const pointsB = lineB.points();
      // Assert
      const expectedF = [new Point(1, 1), new Point(2, 1), new Point(3, 1)];
      const expectedB = [new Point(3, 1), new Point(2, 1), new Point(1, 1)];
      expect(pointsF).toEqual(expectedF);
      expect(pointsB).toEqual(expectedB);
    });
  });
});
