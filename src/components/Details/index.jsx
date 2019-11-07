import React from 'react';

export default function Details({ name, age, gender, displayMessage }) {
  return (
    <React.Fragment>
      <h1>Name: {name}</h1>
      <h1>Age: {age > 21 ? 'Too old' : 'Too young'}</h1>
      {gender && <h1>Gender: {gender}</h1>}
      <button onClick={displayMessage} name="Display message">
        Display message
      </button>
    </React.Fragment>
  );
}
