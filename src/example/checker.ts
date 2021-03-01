import { Point } from "../core/point";
import { GameBoardEngine, GameBoardItem } from "../core/core";
import { Rect } from "../core/rect";

export class Checker implements GameBoardItem {
  private _position: Point;
  private _size: number;

  constructor(
    private gameBoard: GameBoardEngine,
    position: Point,
    size: number,
    private color: string
  ) {
    this._position = position;
    this._size = size;
  }

  get position(): Point {
    return this._position;
  }

  set position(v: Point) {
    if (this._position.isEquals(v)) return;
    this.gameBoard.requestRedrawItem(this);
    this._position = v;
    this.gameBoard.requestRedrawItem(this);
  }

  get size() {
    return this._size;
  }

  set size(v: number) {
    if (this._size === v) return;
    this.gameBoard.requestRedrawItem(this);
    this._size = v;
    this.gameBoard.requestRedrawItem(this);
  }

  getBounds(): Rect {
    const x = this.position.x - this.size / 2;
    const y = this.position.y - this.size / 2;
    return new Rect(x, y, x + this.size, y + this.size);
  }

  render(canvas: CanvasRenderingContext2D): void {
    const pos = this.position;
    const radius = this.size / 2;
    canvas.fillStyle = this.color;
    canvas.beginPath();
    canvas.ellipse(pos.x, pos.y, radius, radius, 0, 0, Math.PI * 2);
    canvas.closePath();
    canvas.fill();

  }
}
