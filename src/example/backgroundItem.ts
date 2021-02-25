import { GameBoardEngine, GameBoardItem, Rect } from "../core/core";

export class BackgroundItem implements GameBoardItem {
  constructor(private gameBoard: GameBoardEngine, private color: string) {}

  getBounds(): Rect {
    const size = this.gameBoard.size;
    return {
      left: 0,
      top: 0,
      right: size.width,
      bottom: size.height,
    };
  }
  
  render(canvas: CanvasRenderingContext2D): void {
    const size = this.gameBoard.size;
    canvas.fillStyle = this.color;
    canvas.fillRect(0, 0, size.width, size.height);
  }
}
