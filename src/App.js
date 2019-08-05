import React, { useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import useWindowSize from './Hooks/useWindowSize';

import "./App.css";

const App = () => {
  const constraintsRef = useRef(null);
  const windowSize = useWindowSize();
  const [isAnimating, setIsAnimating] = useState(false);
  const x = useMotionValue(260);
  const y = useMotionValue(700);

  const smoothPositive = (animValue, curr, target) => {
    setTimeout(() => {
      if ((curr <= target) || curr < target + 0.1) {
        setIsAnimating(false);
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
        setIsAnimating(false);
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

  const handleDragEnd = () => {
    setIsAnimating(true);
    console.log(y.get(), windowSize.height - 300)
    if (y.get() > 512) {
      smoothValue(x, x.get(), 260);
      smoothValue(y, y.get(), 700);
    } else {
      smoothValue(x, x.get(), 0);
      smoothValue(y, y.get(), 0);
    }
  }

  return (
    <div className="App" ref={constraintsRef}>
      <div className="quick-access-bar"></div>
      <motion.div 
        className="dragable"
        drag={!isAnimating}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        dragElastic={0}
        onDragEnd={handleDragEnd}
        style={{ x, y }}
      />
    </div>
  );
}

export default App;