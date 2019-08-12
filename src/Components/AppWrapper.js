import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import smoothValue from '../utilities/smoothValue';

import './AppWrapper.scss';

// Window
const WINDOW_HEIGHT = 812;
const WINDOW_WIDTH = 375;
// App
const APP_BORDER_RADIUS = 40;
// Icon
const ICON_SIZE = 60;
const ICON_BORDER_RADIUS = 15;
// Home button
const HOME_BUTTON_WIDTH = 200;
const HOME_BUTTON_HEIGHT = 6;
const HOME_BUTTON_OFFSET = 7;

const DRAG_DROPOFF = 400;

const AppWrapper = ({Icon, children, iconPosition}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [dragStartX, setDragStartX] = useState(null);
  const [dragStartY, setDragStartY] = useState(null);
  const scale = useMotionValue(1);
  const dragDeltaX = useMotionValue(0);
  const dragDeltaY = useMotionValue(0);

  const width = useMotionValue(ICON_SIZE);
  const height = useMotionValue(ICON_SIZE);
  const x = useMotionValue(iconPosition.x);
  const y = useMotionValue(iconPosition.y);
  const homeButtonX = useMotionValue((WINDOW_WIDTH / 2) - 100);
  const homeButtonY = useMotionValue(WINDOW_HEIGHT - HOME_BUTTON_HEIGHT - HOME_BUTTON_OFFSET);
  const borderRadius = useMotionValue(ICON_BORDER_RADIUS);
  
  const dragHeight = useTransform(dragDeltaY, [0, -DRAG_DROPOFF], [WINDOW_HEIGHT, WINDOW_HEIGHT / 4]);
  const dragX = useTransform(scale, [1, 0], [0, (WINDOW_WIDTH - WINDOW_WIDTH * scale.get()) / 2])
  
  const iconOpacity = useMotionValue(1);
  const appOpacity = useTransform(iconOpacity, [0, 1], [1, 0]);
  const translatedScale = useTransform(dragDeltaY, [0, -DRAG_DROPOFF], [1, 0.25]);
  const zIndex = useTransform(iconOpacity, [0, 0.99, 1], [100, 100, 99]);

  const contentHeight = useTransform(iconOpacity, [0, 0.6], [WINDOW_HEIGHT, 60]);
  const contentWidth = useTransform(iconOpacity, [0, 0.6], [WINDOW_WIDTH, 60]);

  const appY = useTransform(dragDeltaY, [0, -DRAG_DROPOFF, -WINDOW_HEIGHT], [0, -DRAG_DROPOFF, -(WINDOW_HEIGHT - (WINDOW_HEIGHT - DRAG_DROPOFF) / 2)])

  const handleClick = (prevState) => {
    if (!prevState) {
      smoothValue(x, x.get(), 0);
      smoothValue(y, y.get(), 0);
      smoothValue(height, height.get(), WINDOW_HEIGHT);
      smoothValue(width, width.get(), WINDOW_WIDTH);
      smoothValue(borderRadius, ICON_BORDER_RADIUS, APP_BORDER_RADIUS);
      iconOpacity.set(0);

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

    homeButtonX.set((WINDOW_WIDTH - HOME_BUTTON_WIDTH) / 2);
    homeButtonY.set(WINDOW_HEIGHT - HOME_BUTTON_HEIGHT - HOME_BUTTON_OFFSET)

    scale.set(translatedScale.get());
  }
  
  const handleDragEnd = () => {
    setDragStartX(null);
    setDragStartY(null);

    smoothValue(dragDeltaY, dragDeltaY.get(), 0);
    smoothValue(scale, scale.get(), 1);

    if (dragDeltaY.get() < -DRAG_DROPOFF) {
      setIsOpen(false);
      smoothValue(x, x.get(), iconPosition.x);
      smoothValue(y, y.get(), iconPosition.y);
      smoothValue(height, height.get(), ICON_SIZE);
      smoothValue(width, width.get(), ICON_SIZE);
      smoothValue(borderRadius, borderRadius.get(), ICON_BORDER_RADIUS);
      smoothValue(iconOpacity, iconOpacity.get(), 1);
    } else {
      smoothValue(x, x.get(), 0);
      smoothValue(y, y.get(), 0);
      smoothValue(height, height.get(), WINDOW_HEIGHT);
      smoothValue(width, width.get(), WINDOW_WIDTH);
      smoothValue(borderRadius, borderRadius.get(), APP_BORDER_RADIUS);
    }
  }

  return (
      <motion.div 
        className="appWrapper"
        onClick={() => handleClick(isOpen)}
        style={{
          x,
          y,
          width,
          height,
          scale,
          borderRadius,
          zIndex
        }}
      >
        <motion.div 
          className="app-content"
          style={{ 
            opacity: appOpacity,
            height: contentHeight,
            width: contentWidth
          }}
        >
          {children}
        </motion.div>
        <motion.div style={{ opacity: iconOpacity, position: 'absolute' }}>
          <Icon />
        </motion.div>
        {isOpen && <motion.div 
          className="homeButton"
          drag
          onDrag={handleDrag}
          dragMomentum={false}
          dragElastic={0}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{
            x: homeButtonX,
            y: homeButtonY,
          }}
        />}
      </motion.div>
  )
}

export default AppWrapper;
