import { GameBoardItem } from "./core";

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
    return {
      x: this.position.x - this.size / 2,
      y: this.position.y - this.size / 2,
      width: this.size,
      height: this.size,
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
