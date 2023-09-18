import React from 'react';

function UseState({name}) {
  const [error, setError] = React.useState(true);

  return (
    <div>
      <h2>Delete {name}</h2>
      <p>Please, write the security code to probe that you want to delete</p>

      { error && (<p>Error: code is incorrect</p>) }

      <input placeholder='Security Code' />
      <button
        onClick={() => setError(!error)}                              // Usamos la función 'setError' para cambiar el estado de 'error' a su valor contrario
      >Validate</button>
    </div>
  );
}

export { UseState };