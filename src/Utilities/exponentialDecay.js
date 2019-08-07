const exponentialDecay = (from = 400) => {
  const STEPS = 10;
  const linearStep = from / STEPS;
  const linearSteps = [...Array(STEPS)].map((_, i) => (i + 1) * linearStep);
  const exponentialSteps = [...Array(STEPS)].map((_, i) => {
    const exp_map = [...Array(i + 1)].map((_, j) => 1 / Math.pow(2, j));
    return exp_map.reduce((acc, cur) => acc + linearStep * cur, 0);
  })

  return [linearSteps, exponentialSteps]
}

export default exponentialDecay;