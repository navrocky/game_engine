import { BehaviorSubject } from "rxjs";
import { Animation, GameBoardEngine, GameBoardItem } from "./core";
import { Rect } from "./rect";
import { Size } from "./size";

export class GameBoardEngineImpl implements GameBoardEngine {
  private animations: Animation[] = [];
  private items: GameBoardItem[] = [];
  private redrawRegion: Rect | undefined = undefined;
  private context: CanvasRenderingContext2D;
  private animationRequested: boolean = false;
  size = new BehaviorSubject<Size>(Size.EMPTY);

  constructor(canvas: HTMLCanvasElement, private drawBoundingBox: boolean) {
    const resizeObserver = new ResizeObserver(
      (entries: ResizeObserverEntry[]) => {
        entries.forEach((e) => {
          if (e.target === canvas) {
            const boxSize = e.contentBoxSize[0]
              ? e.contentBoxSize[0]
              : ((e.contentBoxSize as any) as ResizeObserverSize);
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
    this.requestAnimationFrame();
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
    this.requestAnimationFrame();
  }

  private requestAnimationFrame() {
    if (this.animationRequested) return;
    window.requestAnimationFrame(this.processFrame.bind(this));
    this.animationRequested = true;
  }

  private processFrame(): void {
    this.animationRequested = false;
    let animationNeeded = false;

    if (this.animations.length > 0) {
      const now = this.getNow();
      this.animations.forEach((a) => a.step(now));
      animationNeeded = true;
    }

    if (this.redrawRegion) {
      this.drawBoard(this.redrawRegion);
      this.redrawRegion = undefined;
      animationNeeded = true;
    }

    if (animationNeeded) {
      this.requestAnimationFrame();
    }
  }

  private drawBoard(region: Rect) {
    this.context.save();

    const boundsPad = 5;

    const r = new Rect(
      Math.floor(region.left - boundsPad),
      Math.floor(region.top - boundsPad),
      Math.ceil(region.right + boundsPad),
      Math.ceil(region.bottom + boundsPad)
    );

    const path = new Path2D();
    path.rect(r.left, r.top, r.width, r.height);
    this.context.clip(path, "nonzero");

    const boundingBoxes = this.items.map((item) => {
      const b = item.getBounds();
      const boundingBox = new Rect(
        Math.floor(b.left - boundsPad),
        Math.floor(b.top - boundsPad),
        Math.ceil(b.right + boundsPad),
        Math.ceil(b.bottom + boundsPad)
      );
      if (region.isIntersects(boundingBox)) {
        this.context.save();
        try {
          item.render(this.context);
        } finally {
          this.context.restore();
        }
      }
      return b;
    });

    if (this.drawBoundingBox) {
      this.context.save();
      this.context.strokeStyle = "white";
      boundingBoxes.forEach((b) => {
        this.context.strokeRect(b.left, b.top, b.width, b.height);
      });
      this.context.restore();
    }
    this.context.restore();
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
