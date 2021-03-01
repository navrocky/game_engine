import { GameBoardEngineImpl } from "../core/gameBoardEngine";
import { NumberAnimation } from "../core/numberAnimation";
import { Point } from "../core/point";
import { BackgroundItem } from "./backgroundItem";
import { Checker } from "./checker";
import Easing from "../core/easing";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const board = new GameBoardEngineImpl(canvas);

const background = new BackgroundItem(board, "green");
board.addItem(background);

function addChecker(pos: Point, color: string, size: number, duration: number) {
  const checker = new Checker(board, pos, 0, color);
  board.addItem(checker);
  const animation = new NumberAnimation(0, size, duration, Easing.SINE_OUT, (v) => {
    checker.size = v;
  });
  board.startAnimation(animation);
}

addChecker(new Point(150,150), "yellow", 500, 2000);
addChecker(new Point(650,650), "red", 500, 500);
addChecker(new Point(1350,250), "blue", 500, 1500);
addChecker(new Point(800,100), "cyan", 500, 1000);

const animationStep = () => {
  board.processFrame();
  window.requestAnimationFrame(animationStep);
};
window.requestAnimationFrame(animationStep);

console.log("Game started!");
