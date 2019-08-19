import { LineSegment } from '../entities/line-segment';
import { Point } from '../entities/point';
import { InvalidLineTypeException } from '../exceptions/invalid-line-type.exception';
import { LineWalker } from './line-walker';

describe('LineWalker', () => {
  // Collect the point from the iterator
  function collectPoints(iterator: IterableIterator<Point>) {
    const points: Point[] = [];
    let pointResult: IteratorResult<Point>;

    while (true) {
      // @ts-ignore
      pointResult = iterator.next();
      // @ts-ignore
      if (pointResult.done) {
        break;
      }
      // @ts-ignore
      points.push(pointResult.value);
    }
    return points;
  }

  it('should walk horizontal lines', () => {
    // Assemble
    // Forwards
    const lineF = new LineSegment(new Point(1, 1), new Point(3, 1));
    // Backwards
    const lineB = new LineSegment(new Point(3, 1), new Point(1, 1));
    // Act
    const pointsF = collectPoints(LineWalker.walkTheLine(lineF));
    const pointsB = collectPoints(LineWalker.walkTheLine(lineB));
    // Assert
    const expectedF = [new Point(1, 1), new Point(2, 1), new Point(3, 1)];
    const expectedB = [new Point(3, 1), new Point(2, 1), new Point(1, 1)];
    expect(pointsF).toEqual(expectedF);
    expect(pointsB).toEqual(expectedB);
  });

  it('should walk vertical lines', () => {
    // Assemble
    // Descending
    const lineD = new LineSegment(new Point(1, 1), new Point(1, 3));
    // Ascending
    const lineA = new LineSegment(new Point(1, 3), new Point(1, 1));
    // Act
    const pointsD = collectPoints(LineWalker.walkTheLine(lineD));
    const pointsA = collectPoints(LineWalker.walkTheLine(lineA));
    // Assert
    const expectedD = [new Point(1, 1), new Point(1, 2), new Point(1, 3)];
    const expectedA = [new Point(1, 3), new Point(1, 2), new Point(1, 1)];
    expect(pointsD).toEqual(expectedD);
    expect(pointsA).toEqual(expectedA);
  });

  it('should walk diagonal lines', () => {
    // Assemble
    // Forwards
    const lineF = new LineSegment(new Point(1, 1), new Point(3, 3));
    // Backwards
    const lineB = new LineSegment(new Point(3, 3), new Point(1, 1));
    // Act
    const pointsF = collectPoints(LineWalker.walkTheLine(lineF));
    const pointsB = collectPoints(LineWalker.walkTheLine(lineB));
    // Assert
    const expectedF = [new Point(1, 1), new Point(2, 2), new Point(3, 3)];
    const expectedB = [new Point(3, 3), new Point(2, 2), new Point(1, 1)];
    expect(pointsF).toEqual(expectedF);
    expect(pointsB).toEqual(expectedB);
  });

  it('should throw an error on invalid line', () => {
    // Assemble
    const lineF = new LineSegment(new Point(1, 1), new Point(4, 3));
    // Act/Assert
    expect(() => LineWalker.walkTheLine(lineF)).toThrow(InvalidLineTypeException);
  });
});
