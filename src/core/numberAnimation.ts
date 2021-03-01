import { IntervalAnimation, IntervalAnimationProps } from "./intervalAnimation";

interface NumberAnimationProps extends IntervalAnimationProps {
  startValue: number;
  endValue: number;
  setter: (v: number) => void;
}

export class NumberAnimation extends IntervalAnimation {
  constructor(props: NumberAnimationProps) {
    super(props);
  }

  update(percent: number): void {
    const props = this.props as NumberAnimationProps;
    const delta = props.endValue - props.startValue;
    const current = props.startValue + delta * percent;
    props.setter(current);
  }
}
