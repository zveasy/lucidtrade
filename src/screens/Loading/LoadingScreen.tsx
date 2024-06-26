import React from 'react';
import logo from '../../photos/transparent.png'; // Adjust the path if necessary

import './LoadingScreen.css';

const LoadingScreen: React.FC = () => {
  return (
    <div className="loading-screen">
      <div className="loading-logo-container">
        <img src={logo} alt="Loading" className="loading-logo" />
      </div>
    </div>
  );
};

export default LoadingScreen;
