const smoothValue = (animValue, curr, target, starting = null) => {
  const startingVal = starting || curr;
  const endCondition = curr < target
    ? (curr >= target) || curr > target - (target - startingVal) * 0.001 // smoothUpwards
    : (curr <= target) || curr < target + (startingVal - target) * 0.001 // smoothDownwards
     
  setTimeout(() => {
    if (endCondition) {
      animValue.set(target);
      return;
    };

    const next = (curr - target) * 0.85 + target;
    animValue.set(next);
    smoothValue(animValue, next, target, startingVal);
  }, 15);
}

export default smoothValue;