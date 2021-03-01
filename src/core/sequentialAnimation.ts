import { Subject, Subscription } from "rxjs";
import { Animation } from "./core";

export class SequentialAnimation implements Animation {
  constructor(private animations: Animation[]) {}

  private animationIndex: number = 0;
  private currentAnimation?: Animation;
  private finishSubscription?: Subscription;
  private currentTimestamp: number = 0;

  onFinish = new Subject<void>();

  private setCurrent(animation?: Animation): void {
    if (this.finishSubscription) {
      this.finishSubscription.unsubscribe();
      this.finishSubscription = undefined;
    }
    this.currentAnimation = animation;
    if (this.currentAnimation) {
      this.finishSubscription = this.currentAnimation.onFinish.subscribe(
        this.startNextAnimation.bind(this)
      );
    }
  }

  private startNextAnimation() {
    if (this.animationIndex >= this.animations.length) {
      this.animationIndex = 0;
      this.onFinish.next();
      return;
    }
    const animation = this.animations[this.animationIndex++];
    this.setCurrent(animation);
    animation.start(this.currentTimestamp);
  }

  start(timestamp: number): void {
    this.animationIndex = 0;
    this.currentTimestamp = timestamp;
    this.startNextAnimation();
  }

  step(timestamp: number): void {
    this.currentTimestamp = timestamp;
    this.currentAnimation?.step(timestamp);
  }
}
