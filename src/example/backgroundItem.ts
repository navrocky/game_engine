import { GameBoardEngine, GameBoardItem } from "../core/core";
import { Rect } from "../core/rect";

export class BackgroundItem implements GameBoardItem {
  constructor(private gameBoard: GameBoardEngine, private color: string) {}

  getBounds(): Rect {
    const size = this.gameBoard.size.getValue();
    return new Rect(0, 0, size.width, size.height);
  }

  render(canvas: CanvasRenderingContext2D): void {
    const size = this.gameBoard.size.getValue();
    canvas.fillStyle = this.color;
    canvas.fillRect(0, 0, size.width, size.height);
  }
}
