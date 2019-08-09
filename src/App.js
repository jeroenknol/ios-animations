import React from "react";
import AppWrapper from './Components/AppWrapper';

import SettingsIcon from './Assets/AppIcons/Settings';

import "./App.css";

const App = () => (
  <div className="Phone">
    <AppWrapper 
      Icon={SettingsIcon}
      iconPosition={{x: 288, y: 725}}
    >
      <div className="outer">
        <div className="inner"></div>
      </div>
    </AppWrapper>
    <div className="quickAccessBar"></div>
  </div>
);

export default App;