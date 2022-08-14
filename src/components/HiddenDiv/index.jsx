import React from 'react';

function HiddenDiv(props) {
  return (
    <div className="hidden-div">
      <div className="hidden-div-content">
        <div className="loader"></div>
        <div>{props.text}</div>
      </div>
    </div>
  );
}

export default HiddenDiv;
