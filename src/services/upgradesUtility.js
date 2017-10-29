const upgradesUtility = {
  computePrice(a, b, level, c) {
    return Math.round((a * Math.pow(b, level)) + c);
  }
};

export default upgradesUtility;
