import { LineSegment } from '../entities/line-segment';
import { Point } from '../entities/point';
import { PathTracker } from '../path-tracker';
import { VisitedNodeValidator } from './visited-node.validator';

describe('VisitedNodeValidator', () => {
  describe('isValid', () => {
    it('should be TRUE if the new line does not touch another visited node', () => {
      const pathTracker = new PathTracker();
      const validator = new VisitedNodeValidator(pathTracker);

      pathTracker.addLine(new LineSegment(new Point(1, 1), new Point(3, 3)));
      const actual = validator.isNewLineValid(new LineSegment(new Point(3, 3), new Point(3, 2)));
      expect(actual).toBeTruthy();
    });

    it('should be FALSE if the new line touches another visited node', () => {
      const pathTracker = new PathTracker();
      const validator = new VisitedNodeValidator(pathTracker);

      pathTracker.addLine(new LineSegment(new Point(1, 1), new Point(3, 3)));
      pathTracker.addLine(new LineSegment(new Point(3, 3), new Point(3, 2)));
      const actual = validator.isNewLineValid(new LineSegment(new Point(3, 2), new Point(1, 2)));
      expect(actual).toBeFalsy();
    });
  });
});
