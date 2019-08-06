const smoothPositive = (animValue, curr, target) => {
  setTimeout(() => {
    if ((curr <= target) || curr < target + 0.1) {
      animValue.set(target);
      // setIsAnimating(false);
      return;
    };
    const next = (curr - target) * 0.85 + target;
    animValue.set(next)
    smoothPositive(animValue, next, target);
  }, 15);
}

const smoothNegative = (animValue, curr, target) => {
  setTimeout(() => {
    if ((curr >= target) || curr + 0.1 > target) {
      animValue.set(target);
      // setIsAnimating(false);
      return;
    };
    const next = (curr - target) * 0.85 + target;
    animValue.set(next)
    smoothNegative(animValue, next, target);
  }, 15);
}

const smoothValue = (animValue, curr, target) => {
  if (curr > target) {
    smoothPositive(animValue, curr, target)
  } else {
    smoothNegative(animValue, curr, target)
  }
}

export default smoothValue;