import { BehaviorSubject } from "rxjs";
import { Animation, GameBoardEngine, GameBoardItem } from "./core";
import { Rect } from "./rect";
import { Size } from "./size";

export class GameBoardEngineImpl implements GameBoardEngine {
  private animations: Animation[] = [];
  private items: GameBoardItem[] = [];
  private redrawRegion: Rect | undefined = undefined;
  private context: CanvasRenderingContext2D;
  size = new BehaviorSubject<Size>(Size.EMPTY);

  constructor(canvas: HTMLCanvasElement) {
    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        entries.forEach((e) => {
          if (e.target === canvas) {
            const boxSize = e.contentBoxSize[0] ? e.contentBoxSize[0] : (e.contentBoxSize as any) as ResizeObserverSize;
            const size = new Size(boxSize.inlineSize, boxSize.blockSize);
            this.size.next(size);
            console.log("Canvas size changed:", size);
            this.requestRedraw();
          }
        });
      }
    );
    resizeObserver.observe(canvas);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Cannot get canvas context");
    this.context = context;
  }

  private getNow(): number {
    return Date.now();
  }

  requestRedraw(region?: Rect): void {
    const r = region
      ? region
      : (() => {
          const size = this.size.getValue();
          return new Rect(0, 0, size.width, size.height);
        })();

    if (this.redrawRegion) {
      this.redrawRegion = this.redrawRegion.uniteWith(r);
    } else {
      this.redrawRegion = r;
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
    animation.start(this.getNow());
  }

  processFrame(): void {
    if (this.animations.length > 0) {
      const now = this.getNow();
      this.animations.forEach((a) => a.animate(now));
    }

    if (this.redrawRegion) {
      this.drawBoard(this.redrawRegion);
      this.redrawRegion = undefined;
    }
  }

  private drawBoard(region: Rect) {
    this.items.forEach((item) => {
      // FIXME intersection is not working
      // if (region.isIntersects(item.getBounds())) {
        this.context.save();
        try {
          item.render(this.context);
        } finally {
          this.context.restore();
        }
      // }
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
