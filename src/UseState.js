import React from 'react';

function UseState({name}) {
  const [error, setError] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if(!!loading){                                                    // Cambiamos el estado de 'loading' a false si el loading esta cargando, esto lo hacemos simulando una petición a un servidor usando un setTimeout de 2000 milisegundos
      setTimeout(() => {
        console.log("Haciendo la validación");
        setLoading(false);
        console.log("Terminando la validación");
      }, 2000);
    }

    console.log("Terminando el efecto");
  }, [loading]);                                                      // Usamos el Hook 'useEffect' para ejecutar un efecto secundario, el cual recibe una función que se ejecutará cuando se renderice el Componente, y un arreglo de dependencias que se usará para ejecutar el efecto secundario cuando alguna de las dependencias cambie de valor


  return (
    <div>
      <h2>Delete {name}</h2>
      <p>Please, write the security code to probe that you want to delete</p>

      { error && (<p>Error: code is incorrect</p>) }

      { loading && (<p>Loading...</p>) }

      <input placeholder='Security Code' />
      <button
        onClick={() => setLoading(true)}                              // Usamos la función 'setError' para cambiar el estado de 'error' a su valor contrario
      >Validate</button>
    </div>
  );
}

export { UseState };