class NumberAnimation extends TimedAnimation {

    constructor(
      private startValue: number,
      private endValue: number,
      duration: number,
      easing: EasingFunction,
      private setter: (v: number) => void
    ) {
      super(duration, easing);
    }
    
    animateWithPercent(percent: number): void {
      const delta = this.endValue - this.startValue;
      const current = this.startValue + delta * percent;
      this.setter(current);
    }
  }
  