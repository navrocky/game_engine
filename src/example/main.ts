import { GameBoardEngineImpl } from "../core/gameBoardEngine";
import { BackgroundItem } from "./backgroundItem";

function startGame(canvas: CanvasRenderingContext2D) {
  const board = new GameBoardEngineImpl(canvas);
  
  const background = new BackgroundItem(board, "red");
  board.addItem(background);

  const animationStep = () => {
    board.processFrame();
    window.requestAnimationFrame(animationStep);
  };
  window.requestAnimationFrame(animationStep);
}
