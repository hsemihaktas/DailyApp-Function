import React from 'react';

function addButton(props) {
  return (
    <button className="addButton" onClick={props.addvalue}>
      +
    </button>
  );
}

export default addButton;
