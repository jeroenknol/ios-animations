import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
// import useWindowSize from './Hooks/useWindowSize';
import smoothValue from './Utilities/smoothValue';

import "./App.css";

const App = () => {
  const constraintsRef = useRef(null);
  // const windowSize = useWindowSize();
  // const [isAnimating, setIsAnimating] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragStartY, setDragStartY] = useState(null);

  const dragDeltaX = useMotionValue(0);
  const dragDeltaY = useMotionValue(0);

  // const calculatedX = useMotionValue(288);
  // const calculatedY = useMotionValue(725);
  const width = useMotionValue(60);
  const height = useMotionValue(60);

  const x = useMotionValue(288);
  const y = useMotionValue(725);
  // const initialWidth = useMotionValue(60);
  // const initialHeight = useMotionValue(60);
  const dragWidth = useTransform(dragDeltaY, [0, -400], [375, 375 / 4]);
  const dragHeight = useTransform(dragDeltaY, [0, -400], [812, 812 / 4]);
  const dragX = useTransform(dragWidth, [375, 0], [0, 375/2])
  const homeButtonWidth = useTransform(dragDeltaY, [0, -400], [200, 200 / 4]);
  const homeButtonHeight = useTransform(dragDeltaY, [0, -400], [6, 6 / 4]);
  const homeButtonX = useMotionValue(0);
  const homeButtonY = useMotionValue(0);
  const borderRadius = useMotionValue(15);
  const dragBorderRadius = useTransform(dragDeltaY, [0, -400], [40, 10]);

  const handleClick = (prevState) => {
    // console.log('App.js - dragDeltaY ', dragDeltaY.get())
    if (!prevState) {
      smoothValue(x, x.get(), 0);
      smoothValue(y, y.get(), 0);
      // smoothValue(initialHeight, initialHeight.get(), 812);
      // smoothValue(initialWidth, initialWidth.get(), 375);
      smoothValue(height, height.get(), 812);
      smoothValue(width, width.get(), 375);
      smoothValue(borderRadius, 15, 40);

      homeButtonX.set((375 / 2) - (homeButtonWidth.get() / 2));
      homeButtonY.set(812 - 6 - 7) // windowHeight - homeButtonHeight - paddingBottom

      setIsOpen(true);
    }
  }

  const handleDragStart = (e) => {
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  }

  const handleDrag = (e) => {
    dragDeltaX.set(e.clientX - dragStartX);
    dragDeltaY.set(e.clientY - dragStartY);

    x.set(dragX.get() + dragDeltaX.get());
    y.set(812 + dragDeltaY.get() - dragHeight.get());

    homeButtonX.set((375 / 2) - (homeButtonWidth.get() / 2) + dragDeltaX.get());

    width.set(dragWidth.get());
    height.set(dragHeight.get());
    borderRadius.set(dragBorderRadius.get());
  }
  
  const handleDragEnd = () => {
    setDragStartX(null);
    setDragStartY(null);

    smoothValue(dragDeltaY, dragDeltaY.get(), 0);
    smoothValue(x, x.get(), 0);
    smoothValue(y, y.get(), 0);
    smoothValue(homeButtonX, homeButtonX.get(), 175 / 2);
    smoothValue(homeButtonY, homeButtonY.get(), 812 - 6 - 7);
    smoothValue(height, height.get(), 812);
    smoothValue(width, width.get(), 375);
    smoothValue(borderRadius, borderRadius.get(), 40)

    // if (y.get() > 512) {
    //   smoothValue(x, x.get(), 288);
    //   smoothValue(y, y.get(), 725);
    // } else {
    //   smoothValue(x, x.get(), 0);
    //   smoothValue(y, y.get(), 0);
    // }
  }

  return (
    <div className="App" ref={constraintsRef}>
      <motion.div 
        className="dragable"
        // drag={!isAnimating && isOpen}
        // dragMomentum={false}
        // dragConstraints={constraintsRef}
        // onDrag={handleDrag}
        // dragElastic={0}
        // onDragStart={handleDragStart}
        // onDragEnd={handleDragEnd}
        onClick={() => handleClick(isOpen)}
        style={{
          x,
          y,
          width,
          height,
          borderRadius: isOpen ? borderRadius : 15,
        }}
      >
      </motion.div>
      {isOpen && <motion.div 
        className="homeButton"
        drag
        onDrag={handleDrag}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        dragElastic={0}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{
          x: homeButtonX,
          y: homeButtonY,
          width: homeButtonWidth,
          height: homeButtonHeight
        }}
      />}
      <div className="quickAccessBar"></div>
    </div>
  );
}

export default App;