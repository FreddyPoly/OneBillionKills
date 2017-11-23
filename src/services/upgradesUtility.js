const upgradesUtility = {
  computePrice(a, b, level, c) {
    return Math.round((a * level) + b);
  }
};

export default upgradesUtility;
