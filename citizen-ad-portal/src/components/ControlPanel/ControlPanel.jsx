import React from 'react';

function ControlPanel(props) {
  const polygon = props.polygon;
  return (
    <div className='control-panel'>
      <h3>Draw Polygon</h3>
      {polygon && (
        <p>
          {polygon} <br />
          square meters
        </p>
      )}
    </div>
  );
}

export default ControlPanel;
