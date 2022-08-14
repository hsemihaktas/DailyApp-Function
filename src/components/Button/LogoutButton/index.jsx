import React from 'react';

function logoutButton(props) {
  return (
    <button className="logoutButton" onClick={props.deleteToken}>
      Çıkış Yap
    </button>
  );
}

export default logoutButton;
