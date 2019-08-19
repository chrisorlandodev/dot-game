import { Point } from './point';

describe('Point', () => {
  it('should expose its x,y coordinates', () => {
    // Act
    const point = new Point(1, 1);
    // Assert
    const expected = { x: 1, y: 1 };
    expect(point).toEqual(expected);
  });

  describe('is()', () => {
    it('should return TRUE if two points are equal', () => {
      // Assemble
      const pointA = new Point(1, 1);
      const pointB = new Point(1, 1);
      // Act
      const actual = pointA.is(pointB);
      // Assert
      expect(actual).toBeTruthy();
    });

    it('should return FALSE if two points are not equal', () => {
      // Assemble
      const pointA = new Point(1, 1);
      const pointB = new Point(2, 2);
      // Act
      const actual = pointA.is(pointB);
      // Assert
      expect(actual).toBeFalsy();
    });
  });
});
