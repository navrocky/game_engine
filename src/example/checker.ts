import {
  GameBoardEngine,
  GameBoardItem,
  isPointsEquals,
  Point,
  Rect,
} from "../core/core";

class Checker implements GameBoardItem {
  constructor(
    private gameBoard: GameBoardEngine,
    public position: Point,
    public size: number
  ) {}

  setPosition(v: Point) {
    if (isPointsEquals(this.position, v)) return;
    this.position = v;
    this.gameBoard.requestRedrawItem(this);
  }

  getBounds(): Rect {
    const x = this.position.x - this.size / 2;
    const y = this.position.y - this.size / 2;
    return {
      left: x,
      top: y,
      right: x + this.size,
      bottom: y + this.size,
    };
  }

  render(canvas: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }
}

class Background implements GameBoardItem {
  render(canvas: CanvasRenderingContext2D): void {
    throw new Error("Method not implemented.");
  }
}
