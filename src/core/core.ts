import { BehaviorSubject, Subject } from "rxjs";
import { Rect } from "./rect";
import { Size } from "./size";

export type EasingFunction = (v: number) => number;

export interface Animation {
  onFinish: Subject<void>;
  start(timestamp: number): void;
  step(timestamp: number): void;
}

export interface GameBoardItem {
  getBounds(): Rect;
  render(canvas: CanvasRenderingContext2D): void;
}

export interface GameBoardEngine {
  readonly size: BehaviorSubject<Size>;
  startAnimation(animation: Animation): void;
  addItem(item: GameBoardItem): void;
  removeItem(item: GameBoardItem): void;
  requestRedraw(region: Rect): void;
  requestRedrawItem(item: GameBoardItem): void;
}
