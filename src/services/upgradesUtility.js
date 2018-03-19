const upgradesUtility = {
  computePrice(a, b, level, c, d) {
    return Math.floor(b + ((level / c) * Math.exp((d * level) / a)));
  }
};

export default upgradesUtility;
