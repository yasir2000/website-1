export default {
  lerp: (a, b, n) => a * (1 - n) + b * n,
  norm: (value, min, max) => (value - min) / (max - min),
};
