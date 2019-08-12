import React from "react";
import AppWrapper from './components/AppWrapper';

import SettingsIcon from './assets/AppIcons/Settings';
import ClockIcon from './assets/AppIcons/Clock';

import "./App.css";

const App = () => (
  <div className="Phone">
    <AppWrapper 
      Icon={SettingsIcon}
      iconPosition={{x: 288, y: 725}}
    >
      <div className="outer">
        <div className="inner">PLACEHOLDER SETTINGS APP</div>
      </div>
    </AppWrapper>
    <AppWrapper 
      Icon={ClockIcon}
      iconPosition={{x: 201, y: 725}}
    >
      <div className="outer">
        <div className="inner">PLACEHOLDER CLOCK APP</div>
      </div>
    </AppWrapper>
    <div className="quickAccessBar"></div>
  </div>
);

export default App;