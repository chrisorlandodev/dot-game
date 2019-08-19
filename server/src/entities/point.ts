export class Point {
  constructor(public readonly x: number, public readonly y: number) {}

  /**
   * Check whether a given point is the same point;
   *
   * @param point
   */
  is(point: Point) {
    return this.x === point.x && this.y === point.y;
  }

  get name() {
    return `(${this.x},${this.y})`;
  }

  toString() {
    return 'Point' + this.name;
  }
}
