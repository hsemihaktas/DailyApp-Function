import React from 'react';

function addButton(props) {
  return (
    <button
      className="deleteButton fa-solid fa-trash"
      id={props.id}
      onClick={(event) => props.deletevalue(event.target.id)}
    ></button>
  );
}

export default addButton;
