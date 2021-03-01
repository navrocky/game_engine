export class Rect {
  static readonly EMPTY = new Rect(0, 0, 0, 0);

  constructor(
    public left: number,
    public top: number,
    public right: number,
    public bottom: number
  ) {}

  get width() {
    return this.right - this.left;
  }

  get height() {
    return this.bottom - this.top;
  }

  isEmpty(): boolean {
    return this.left === this.right && this.top === this.bottom;
  }

  intersectWith(other: Rect): Rect {
    const left = Math.max(this.left, other.left);
    const top = Math.max(this.top, other.top);
    const right = Math.min(this.right, other.right);
    const bottom = Math.min(this.bottom, other.bottom);
    if (left < right && top < bottom)
      return new Rect(
        Math.max(this.left, other.left),
        Math.max(this.top, other.top),
        Math.min(this.right, other.right),
        Math.min(this.bottom, other.bottom)
      );
    else return Rect.EMPTY;
  }

  uniteWith(other: Rect): Rect {
    return new Rect(
      Math.min(this.left, other.left),
      Math.min(this.top, other.top),
      Math.max(this.right, other.right),
      Math.max(this.bottom, other.bottom)
    );
  }

  isIntersects(other: Rect): boolean {
    return !this.intersectWith(other).isEmpty();
  }
}
