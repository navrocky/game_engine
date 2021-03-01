export default {
  LINEAR: (x: number) => x,
  SINE_OUT: (x: number) => Math.sin((x * Math.PI) / 2),
  QUAD_IN: (x: number) => x * x,
  QUAD_OUT: (x: number) => x * (2 - x),
  QUAD_IN_OUT: (x: number) => (x < 0.5 ? 2 * x * x : -1 + (4 - 2 * x) * x),
};
