import { Subject } from "rxjs";
import { Animation, EasingFunction } from "./core";

export interface IntervalAnimationProps {
  /**
   * Duration in milliseconds
   * */
  duration: number;

  /**
   * Easing function
   */
  easing?: EasingFunction;
}

export abstract class IntervalAnimation implements Animation {
  private startedAt?: number;
  onFinish = new Subject<void>();

  constructor(protected props: IntervalAnimationProps) {}

  start(timestamp: number): void {
    this.startedAt = timestamp;
  }

  step(timestamp: number): void {
    if (!this.startedAt) return;
    const v = (timestamp - this.startedAt) / this.props.duration;
    const finalV = this.props.easing ? this.props.easing(v) : v;
    this.update(finalV);
    if (timestamp >= this.startedAt + this.props.duration) {
      this.onFinish.next();
    }
  }

  /**
   * Updates value each time tick.
   *
   * @param percent completion percent. Changed from 0 to 1.
   */
  abstract update(percent: number): void;
}
