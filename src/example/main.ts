import { GameBoardEngineImpl } from "../core/gameBoardEngine";
import { NumberAnimation } from "../core/numberAnimation";
import { Point } from "../core/point";
import { BackgroundItem } from "./backgroundItem";
import { Checker } from "./checker";
import Easing from "../core/easing";
import { SplineAnimation } from "../core/splineAnimation";
import { SequentialAnimation } from "../core/sequentialAnimation";
import { LoopAnimation } from "../core/loopAnimation";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const board = new GameBoardEngineImpl(canvas, false);

const background = new BackgroundItem(board, "green");
board.addItem(background);

for (let y = 0; y < 200; y++) {
  for (let x = 0; x < 200; x++) {
    const checker = new Checker(board, new Point(x * 30, y * 30), 20, "#005500");
    board.addItem(checker);
  }
}

function addChecker(
  pos: Point,
  color: string,
  size: number,
  duration: number
): Checker {
  const checker = new Checker(board, pos, 0, color);
  board.addItem(checker);
  if (duration > 0) {
    const animation = new NumberAnimation({
      startValue: 0,
      endValue: size,
      duration: duration,
      easing: Easing.SINE_OUT,
      setter: (v) => (checker.size = v),
    });
    board.startAnimation(animation);
  }
  return checker;
}

addChecker(new Point(650, 650), "red", 500, 500);
const checker2 = addChecker(new Point(1350, 250), "blue", 500, 0);
addChecker(new Point(800, 100), "cyan", 500, 1000);
const checker = addChecker(new Point(150, 150), "yellow", 100, 2000);

const splineAnimation = new LoopAnimation(
  new SequentialAnimation([
    new SplineAnimation({
      duration: 3000,
      start: new Point(100, 300),
      startGrip: new Point(100, 300 - 1000),
      stop: new Point(1400, 300),
      stopGrip: new Point(1400, 300 + 1000),
      setter: (v) => (checker.position = v),
    }),
    new SplineAnimation({
      duration: 3000,
      start: new Point(1400, 300),
      startGrip: new Point(1400, 300 - 1000),
      stop: new Point(100, 300),
      stopGrip: new Point(100, 300 + 1000),
      setter: (v) => (checker.position = v),
    }),
  ]),
  2
);
board.startAnimation(splineAnimation);

const pulseAnimation = new LoopAnimation(
  new SequentialAnimation([
    new NumberAnimation({
      duration: 500,
      startValue: 50,
      endValue: 250,
      setter: (v) => (checker2.size = v),
      easing: Easing.QUAD_IN,
    }),
    new NumberAnimation({
      duration: 500,
      startValue: 250,
      endValue: 50,
      setter: (v) => (checker2.size = v),
      easing: Easing.QUAD_OUT,
    }),
  ])
);
board.startAnimation(pulseAnimation);

console.log("Game started!");
