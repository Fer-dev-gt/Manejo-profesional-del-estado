import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({name}) {
  const [state, setState] = React.useState({                                     // Forma de usar el Hook 'useState' para crear un solo 'state' que maneja varios estados
    value: '',
    error: false,
    loading: false,
  });

  console.log(state);

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if(!!state.loading){                                                         // Para evitar un bucle infinito de actualizaciones, solo vamos a ejecutar el código si el loading esta cargando, en donde vamos a cambiar el State de 'loading' a false si el loading esta cargando, esto lo hacemos simulando una petición a un servidor usando un setTimeout de 2000 milisegundos, hacemos una doble negación para convertir el valor a booleano
      setTimeout(() => {
        console.log("Haciendo la validación");

        if(state.value !== SECURITY_CODE) {
          setState({ ...state, loading: false, error: true });                   // Cambiamos los States de loading y error usando la función 'setState' cuando el código de seguridad no sea igual al código de seguridad que tenemos definido, ademas es necesario para no sobreescrbir los otros estados que no estamos cambiando, usar el operador de propagación '...state' para copiar los otros estados que no estamos cambiando
        }else{
          setState({ ...state, loading: false, error: false });
        }

        console.log("Terminando la validación");
      }, 2000);
    }

    console.log("Terminando el efecto");
  }, [state.loading]);                                                          // Usamos el Hook 'useEffect' para ejecutar un efecto secundario, el cual recibe una función que se ejecutará cuando se renderice el Componente, y un arreglo de dependencias que se usará para ejecutar el efecto secundario cuando 'state.loading' cambie de valor


  return (
    <div>
      <h2>Delete {name}</h2>
      <p>Please, write the security code to probe that you want to delete</p>

      { (state.error && !state.loading) && (<p>Error: code is incorrect</p>) }
      { state.loading && (<p>Loading...</p>) }

      <input 
        placeholder='Security Code' 
        value={state.value}
        onChange={(event) => { setState({ ...state, value: event.target.value }) }}        // Cambiamos el valor del State value usando la función 'setValue' cuando el usuario escriba en el input con el valor dentro del input
      />
      <button
        onClick={() => { 
          setState({ ...state, loading: true, error: false })
        }}                              
      >Validate</button>
    </div>
  );
}

export { UseState };