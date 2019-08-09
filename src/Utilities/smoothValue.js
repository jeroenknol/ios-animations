const smoothNegative = (animValue, curr, target, starting = null) => {
  const startingVal = starting || curr;

  setTimeout(() => {
    if ((curr <= target) || curr < target + (startingVal - target) * 0.01) {
      animValue.set(target);
      return;
    };
    const next = (curr - target) * 0.85 + target;
    animValue.set(next)
    smoothPositive(animValue, next, target, startingVal);
  }, 15);
}

const smoothPositive = (animValue, curr, target, starting = null) => {
  const startingVal = starting || curr;

  setTimeout(() => {
    if ((curr >= target) || curr > target - (target - startingVal) * 0.01) {
      animValue.set(target);
      return;
    };
    const next = (curr - target) * 0.85 + target;
    animValue.set(next)
    smoothNegative(animValue, next, target, startingVal);
  }, 15);
}

const smoothValue = (animValue, curr, target) => {
  if (curr < target) {
    smoothPositive(animValue, curr, target)
  } else {
    smoothNegative(animValue, curr, target)
  }
}

export default smoothValue;