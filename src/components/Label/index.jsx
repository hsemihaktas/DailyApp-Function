import React from 'react';

function label(props) {
  return (
    <div>
      <label className="label" id={props.id}>
        {props.text}
      </label>
    </div>
  );
}

export default label;
