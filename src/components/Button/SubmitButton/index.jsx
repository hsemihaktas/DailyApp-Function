import React from 'react';

function submitButton(props) {
  return (
    <button className="submitButton" onClick={props.submitValue}>
      Submit
    </button>
  );
}

export default submitButton;
