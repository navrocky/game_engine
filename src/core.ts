export interface Subscription {
  unsubscribe(): void;
}

export interface Subject<T> {
  subscribe(onTrigger: (v: T) => void): Subscription;
}

export interface Rect {
  left: number;
  top: number;
  bottom: number;
  right: number;
}

export function isIntersects(r1: Rect, r2: Rect): boolean {
  //TODO
  return false;
}

export function uniteRects(r1: Rect, r2: Rect): Rect {
  return {
    left: Math.min(r1.left, r2.left),
    top: Math.min(r1.top, r2.top),
    right: Math.max(r1.right, r2.right),
    bottom: Math.max(r1.bottom, r2.bottom),
  };
}

export interface Point {
  x: number;
  y: number;
}

export function isPointsEquals(p1: Point, p2: Point): boolean {
  return p1.x === p2.x && p1.y === p2.y;
}

export type EasingFunction = (v: number) => number;

export interface Animation {
  onFinish: Subject<void>;
  start(timestamp: number): void;
  animate(timestamp: number): void;
}

export interface GameBoardItem {
  getBounds(): Rect;
  render(canvas: CanvasRenderingContext2D): void;
}

export interface GameBoardEngine {
  startAnimation(animation: Animation): void;
  onEachFrame(): void;
  addItem(item: GameBoardItem): void;
  removeItem(item: GameBoardItem): void;
  requestRedraw(region: Rect): void;
  requestRedrawItem(item: GameBoardItem): void;
}

export const Easing = {
  LINEAR: (x: number) => x,
  SINE_OUT: (x: number) => Math.sin((x * Math.PI) / 2),
};
