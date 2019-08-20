import { DotGameLog } from './dot-game.log';
import { LineSegment } from './entities/line-segment';
import { Point } from './entities/point';
import { NoEndpointsException } from './exceptions/no-endpoints.exception';

/**
 * Keeps track of the lines played and points visited during the game
 */
export class PathTracker {
  private _visitedPoints: Point[] = [];
  get visitedPoints() {
    return this._visitedPoints;
  }

  // The lines that make up the path
  private _lines: LineSegment[] = [];

  /**
   * The path as a series of points
   */
  get path() {
    const path: Point[] = [];
    let line: LineSegment | undefined;
    for (line of this._lines) {
      path.push(line.startPoint);
    }
    if (line) {
      path.push(line.endPoint);
    }
    return path;
  }

  /**
   * Get the lines that are constructed by extracting the from the path
   */
  get lines(): LineSegment[] {
    return this._lines;
  }

  /**
   * Store a new LineSegment
   *
   * If this is a continuation of the path, then prepend/append the line segments endpoint.
   * Otherwise (i.e. no path yet), then all the lines points to the Path
   *
   * @param line
   */
  addLine(line: LineSegment) {
    DotGameLog.debug('Adding Line: ', line.name);
    DotGameLog.debug('Current Path:', this.path.toString());
    // There IS an existing path!
    if (this.hasEndPoints()) {
      /**
       * If the player used the head of the path prepend the points to the path; otherwise, append.
       */
      if (line.startPoint.is(this.headPoint())) {
        // Flip the line as it's endpoint becomes the new head point of the path
        const flippedLine = line.asFlipped();
        DotGameLog.debug('Prepend Line(flipped): ', flippedLine.name);
        this._lines.unshift(flippedLine);
      } else {
        DotGameLog.debug('Append Line: ', line.name);
        this._lines.push(line);
      }
    } else {
      // There IS NOT an existing path!
      this._lines.push(line);
    }

    // Log the points that the lines visits
    line.points().forEach(p => this._visitedPoints.push(p));

    DotGameLog.debug('New Path:', this.path.toString());
  }

  /**
   * Checks if there is a path at least 2 points
   */
  hasEndPoints() {
    return this._lines.length > 0;
  }

  /**
   * Check whether a path is an endpoint (beginning or end of the path).
   *
   * @param point
   */
  isEndPoint(point: Point) {
    return this.headPoint().is(point) || this.tailPoint().is(point);
  }

  /**
   * Get the Head (first) point on the path
   */
  headPoint() {
    if (!this.hasEndPoints()) {
      throw new NoEndpointsException('Head point does not exists');
    }

    return this._lines[0].startPoint;
  }

  /**
   * Get the Tail (last) point on the path
   */
  tailPoint() {
    if (!this.hasEndPoints()) {
      throw new NoEndpointsException('Tail point does not exists');
    }
    return this._lines[this.lines.length - 1].endPoint;
  }

  /**
   * Build a path from a series of coordinate pairs
   *
   * @param coordinates Coordinate pairs
   */
  build(coordinates: number[][]) {
    this._lines = [];
    for (let i = 0; i < coordinates.length - 1; i++) {
      const startPoint = new Point(coordinates[i][0], coordinates[i][1]);
      const endPoint = new Point(coordinates[i + 1][0], coordinates[i + 1][1]);
      this.addLine(new LineSegment(startPoint, endPoint));
    }
  }
}
