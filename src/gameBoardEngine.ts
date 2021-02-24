import {
  GameBoardEngine,
  GameBoardItem,
  Animation,
  isIntersects,
  Rect,
  uniteRects,
} from "./core";

class GameBoardEngineImpl implements GameBoardEngine {
  private animations: Animation[] = [];
  private items: GameBoardItem[] = [];
  private redrawRegion: Rect | undefined = undefined;

  constructor(private canvas: CanvasRenderingContext2D) {}

  requestRedraw(region: Rect): void {
    if (this.redrawRegion) {
      this.redrawRegion = uniteRects(this.redrawRegion, region);
    } else {
      this.redrawRegion = region;
    }
  }

  requestRedrawItem(item: GameBoardItem): void {
    this.requestRedraw(item.getBounds());
  }

  startAnimation(animation: Animation): void {
    const subscription = animation.onFinish.subscribe(() => {
      const i = this.animations.indexOf(animation);
      if (i >= 0) this.animations.splice(i, 1);
      subscription.unsubscribe();
    });
    this.animations.push(animation);
  }

  onEachFrame(): void {
    if (this.animations.length > 0) {
      const now = Date.now();
      this.animations.forEach((a) => a.animate(now));
    }

    if (this.redrawRegion) {
      this.drawBoard(this.redrawRegion);
    }
  }

  private drawBoard(region: Rect) {
    this.items.forEach((item) => {
      if (isIntersects(item.getBounds(), region)) {
        item.render(this.canvas);
      }
    });
  }

  addItem(item: GameBoardItem): void {
    this.items.push(item);
    this.requestRedrawItem(item);
  }

  removeItem(item: GameBoardItem): void {
    const i = this.items.indexOf(item);
    if (i >= 0) this.items.splice(i, 1);
    this.requestRedrawItem(item);
  }
}
