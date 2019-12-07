import React from 'react';

export default ({ display, stackedValue, USDRate, toggleRotate }) => {
  if (!display) return null;
  
  return (
    <div className="analytics-panel abs-container-top main-container-top">
      <h1>{ stackedValue }</h1>
      <h2>FOAM Tokens Staked</h2>
      <br />
      <h1>$ { (stackedValue * USDRate).toFixed(2) }</h1>
      <h2>Net Value Staked</h2>
      <br />
      <p className="viz-description">This globe represents an aggregate of all points from FOAMs inception till now</p>
      <div className="rotation-container">
        <div className="rotation">Rotation:</div>
        <div>
          <label className="switch">
            <input type="checkbox" onChange={toggleRotate} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );    
};
