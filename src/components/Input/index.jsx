import React from 'react';
import classnames from 'classnames';

function input(props) {
  return (
    <>
      <input
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        className={classnames('input', {
          dangerInpt: props.error,
        })}
        {...props}
      ></input>
      {!!props.error && <p className="dangerText">{props.error}</p>}
    </>
  );
}

export default input;
