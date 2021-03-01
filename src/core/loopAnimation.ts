import { Subject } from "rxjs";
import { Animation } from "./core";

export class LoopAnimation implements Animation {
  constructor(private animation: Animation, private loops?: number) {
    this.animation.onFinish.subscribe(this.restart.bind(this));
  }

  onFinish = new Subject<void>();
  private count: number = 0;
  private currentTimestamp: number = 0;

  private restart() {
    if (this.loops && this.count >= this.loops) {
      this.onFinish.next();
      return;
    }
    this.count++;
    this.animation.start(this.currentTimestamp);
  }

  start(timestamp: number): void {
    this.currentTimestamp = timestamp;
    this.count = 0;
    this.restart();
  }

  step(timestamp: number): void {
    this.currentTimestamp = timestamp;
    this.animation.step(timestamp);
  }
}
