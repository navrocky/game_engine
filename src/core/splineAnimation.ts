import { Point } from "./point";
import { IntervalAnimation, IntervalAnimationProps } from "./intervalAnimation";

interface SplineAnimationProps extends IntervalAnimationProps {
  start: Point;
  stop: Point;
  startGrip?: Point;
  stopGrip?: Point;
  setter: (v: Point) => void;
}

function interpolate(start: number, stop: number, amount: number) {
  return start + (stop - start) * amount;
}

function interpolatePoint(start: Point, stop: Point, amount: number) {
  return new Point(
    interpolate(start.x, stop.x, amount),
    interpolate(start.y, stop.y, amount)
  );
}

/**
 * Animate postion by cubic bezier spline.
 * @see https://en.wikipedia.org/wiki/B%C3%A9zier_curve
 */
export class SplineAnimation extends IntervalAnimation {
  constructor(props: SplineAnimationProps) {
    super(props);
  }

  update(percent: number): void {
    const props = this.props as SplineAnimationProps;

    const p0 = props.start;
    const p1 = props.startGrip || p0;
    const p3 = props.stop;
    const p2 = props.stopGrip || p3;

    const q0 = interpolatePoint(p0, p1, percent);
    const q1 = interpolatePoint(p1, p2, percent);
    const q2 = interpolatePoint(p2, p3, percent);

    const r0 = interpolatePoint(q0, q1, percent);
    const r1 = interpolatePoint(q1, q2, percent);

    const b = interpolatePoint(r0, r1, percent);

    props.setter(b);
  }
}
