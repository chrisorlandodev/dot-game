import { Point } from './entities/point';
import { PathTracker } from './path-tracker';

describe('PathTracker', () => {
  const coordinates = [
    [1, 2], // head
    [2, 1],
    [1, 1],
    [0, 2],
    [1, 3],
    [2, 2],
    [3, 1],
    [2, 0],
    [1, 0],
    [0, 1],
    [0, 0], // tail
  ];

  const pathTracker = new PathTracker();
  pathTracker.build(coordinates);

  it('should build a path from coordinates', () => {
    // build happens above
    expect(pathTracker.lines.length).toBe(coordinates.length - 1);
  });

  it('should return head and tail points', () => {
    expect(pathTracker.headPoint()).toEqual(new Point(1, 2));
    expect(pathTracker.tailPoint()).toEqual(new Point(0, 0));
  });

  it('should verify endpoint', () => {
    expect(pathTracker.isEndPoint(new Point(1, 2))).toBeTruthy();
    expect(pathTracker.isEndPoint(new Point(0, 0))).toBeTruthy();
    expect(pathTracker.isEndPoint(new Point(3, 3))).toBeFalsy();
  });
});
