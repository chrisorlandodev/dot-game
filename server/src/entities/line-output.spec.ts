import { LineOutput } from './line-output';
import { LineSegment } from './line-segment';
import { Point } from './point';

it('LineOutput', () => {
  // Assemble
  const pointA = new Point(1, 1);
  const pointB = new Point(2, 2);
  const lineSegment = new LineSegment(pointA, pointB);
  // Act
  const lineOut = new LineOutput(lineSegment);
  // Assert
  const expected = {
    start: { x: 1, y: 1 },
    end: { x: 2, y: 2 },
  };
  expect(lineOut).toEqual(expected);
});
