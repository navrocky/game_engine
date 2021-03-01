export class Point {
  static readonly EMPTY = new Point(0, 0);

  constructor(public readonly x: number, public readonly y: number) {}

  isEquals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }
}
