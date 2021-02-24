abstract class TimedAnimation implements Animation {
  private startedAt: number;
  // onFinish: Subject<void>;

  constructor(private duration: number, private easing: EasingFunction) {}

  start(timestamp: number): void {
    this.startedAt = timestamp;
  }

  animate(timestamp: number): void {
    const v = this.easing((timestamp - this.startedAt) / this.duration);
    this.animateWithPercent(v);
  }

  abstract animateWithPercent(percent: number): void;
}
