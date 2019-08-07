import React, { useRef } from "react";
import AppWrapper from './Components/AppWrapper';

import SettingsIcon from './Assets/AppIcons/Settings';

import "./App.css";

const App = () => {
  const constraintsRef = useRef(null);

  return (
    <div className="Phone" ref={constraintsRef}>
      <AppWrapper Icon={SettingsIcon} constraints={constraintsRef}>
        <div className="outer">
          <div className="inner"></div>
        </div>
      </AppWrapper>
      <div className="quickAccessBar"></div>
    </div>
  );
}

export default App;