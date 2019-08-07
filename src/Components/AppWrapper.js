import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import smoothValue from '../Utilities/smoothValue';

import './AppWrapper.scss';

// Window
const WINDOW_HEIGHT = 812;
const WINDOW_WIDTH = 375;
// App
const APP_BORDER_RADIUS = 40;
// Icon
const ICON_SIZE = 60;
const ICON_BORDER_RADIUS = 15;
const ICON_X = 288;
const ICON_Y = 725;
// Home button
const HOME_BUTTON_WIDTH = 200;
const HOME_BUTTON_HEIGHT = 6;
const HOME_BUTTON_OFFSET = 7;

const DRAG_DROPOFF = 400;

const AppWrapper = ({constraints, Icon, children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [dragStartX, setDragStartX] = useState(null);
  const [dragStartY, setDragStartY] = useState(null);
  const dragDeltaX = useMotionValue(0);
  const dragDeltaY = useMotionValue(0);

  const width = useMotionValue(ICON_SIZE);
  const height = useMotionValue(ICON_SIZE);
  const x = useMotionValue(ICON_X);
  const y = useMotionValue(ICON_Y);
  const homeButtonX = useMotionValue(0);
  const homeButtonY = useMotionValue(0);
  const borderRadius = useMotionValue(ICON_BORDER_RADIUS);

  const dragWidth = useTransform(dragDeltaY, [0, -DRAG_DROPOFF], [WINDOW_WIDTH, WINDOW_WIDTH / 4]);
  const dragHeight = useTransform(dragDeltaY, [0, -DRAG_DROPOFF], [WINDOW_HEIGHT, WINDOW_HEIGHT / 4]);
  const dragX = useTransform(dragWidth, [WINDOW_WIDTH, 0], [0, WINDOW_WIDTH/2])
  const homeButtonWidth = useTransform(dragDeltaY, [0, -DRAG_DROPOFF], [HOME_BUTTON_WIDTH, HOME_BUTTON_WIDTH / 4]);
  const homeButtonHeight = useTransform(dragDeltaY, [0, -DRAG_DROPOFF], [HOME_BUTTON_HEIGHT, HOME_BUTTON_HEIGHT / 4]);
  const dragBorderRadius = useTransform(dragDeltaY, [0, -DRAG_DROPOFF], [APP_BORDER_RADIUS, 10]);
  
  const iconOpacity = useMotionValue(1);
  const appOpacity = useTransform(iconOpacity, [0, 1], [1, 0]);
  const scale = useTransform(width, [WINDOW_WIDTH, 0], [1, 0]);

  const appY = useTransform(dragDeltaY, [0, -DRAG_DROPOFF, -WINDOW_HEIGHT], [0, -DRAG_DROPOFF, -(WINDOW_HEIGHT - (WINDOW_HEIGHT - DRAG_DROPOFF) / 2)])

  const handleClick = (prevState) => {
    if (!prevState) {
      smoothValue(x, x.get(), 0);
      smoothValue(y, y.get(), 0);
      smoothValue(height, height.get(), WINDOW_HEIGHT);
      smoothValue(width, width.get(), WINDOW_WIDTH);
      smoothValue(borderRadius, ICON_BORDER_RADIUS, APP_BORDER_RADIUS);
      iconOpacity.set(0);

      homeButtonX.set((WINDOW_WIDTH / 2) - (homeButtonWidth.get() / 2));
      homeButtonY.set(WINDOW_HEIGHT - HOME_BUTTON_HEIGHT - HOME_BUTTON_OFFSET) // windowHeight - homeButtonHeight - paddingBottom

      setIsOpen(true);
    }
  }

  const handleDragStart = (e) => {
    // Store the position where we started the drag
    setDragStartX(e.clientX);
    setDragStartY(e.clientY);
  }

  const handleDrag = (e) => {
    // Calculate and set the delta using the starting position of the drag
    dragDeltaX.set(e.clientX - dragStartX);
    dragDeltaY.set(e.clientY - dragStartY);

    x.set(dragX.get() + dragDeltaX.get());
    y.set(WINDOW_HEIGHT + appY.get() - dragHeight.get());

    homeButtonX.set((WINDOW_WIDTH / 2) - (homeButtonWidth.get() / 2) + dragDeltaX.get());
    homeButtonY.set(WINDOW_HEIGHT - HOME_BUTTON_HEIGHT - HOME_BUTTON_OFFSET + appY.get())

    width.set(dragWidth.get());
    height.set(dragHeight.get());
    borderRadius.set(dragBorderRadius.get());
  }
  
  const handleDragEnd = () => {
    setDragStartX(null);
    setDragStartY(null);

    smoothValue(dragDeltaY, dragDeltaY.get(), 0);

    if (dragDeltaY.get() < -DRAG_DROPOFF) {
      setIsOpen(false);
      smoothValue(x, x.get(), ICON_X);
      smoothValue(y, y.get(), ICON_Y);
      smoothValue(height, height.get(), ICON_SIZE);
      smoothValue(width, width.get(), ICON_SIZE);
      smoothValue(borderRadius, borderRadius.get(), ICON_BORDER_RADIUS);
      smoothValue(iconOpacity, iconOpacity.get(), 1);
    } else {
      smoothValue(x, x.get(), 0);
      smoothValue(y, y.get(), 0);
      smoothValue(homeButtonX, homeButtonX.get(), (WINDOW_WIDTH - HOME_BUTTON_WIDTH) / 2);
      smoothValue(homeButtonY, homeButtonY.get(), WINDOW_HEIGHT - HOME_BUTTON_HEIGHT - HOME_BUTTON_OFFSET);
      smoothValue(height, height.get(), WINDOW_HEIGHT);
      smoothValue(width, width.get(), WINDOW_WIDTH);
      smoothValue(borderRadius, borderRadius.get(), APP_BORDER_RADIUS);
    }
  }

  return (
    <>
      <motion.div 
        className="dragable"
        onClick={() => handleClick(isOpen)}
        style={{
          x,
          y,
          width,
          height,
          borderRadius,
        }}
      >
        <motion.div className="app-content" style={{ opacity: appOpacity, scale }}>
          {children}
        </motion.div>
        <motion.div style={{ opacity: iconOpacity }}>
          <Icon />
        </motion.div>
      </motion.div>
      {isOpen && <motion.div 
        className="homeButton"
        drag
        onDrag={handleDrag}
        dragMomentum={false}
        dragConstraints={constraints}
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
    </>
  )
}

export default AppWrapper;
