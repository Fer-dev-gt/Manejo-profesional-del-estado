import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({name}) {
  const [state, setState] = React.useState({                                     // Forma de usar el Hook 'useState' para crear un solo 'state' que maneja varios estados
    value: '',
    error: false,
    loading: false,
    deleted: false,                                                              // State para mostrar pantalla de que se eliminó correctamente
    confirmed: false                                                             // State para mostrar pantalla para confirmar que se quiere eliminar
  });

  console.log(state);

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if(!!state.loading){                                                         // Para evitar un bucle infinito de actualizaciones, solo vamos a ejecutar el código si el loading esta cargando, en donde vamos a cambiar el State de 'loading' a false si el loading esta cargando, esto lo hacemos simulando una petición a un servidor usando un setTimeout de 2000 milisegundos, hacemos una doble negación para convertir el valor a booleano
      setTimeout(() => {
        console.log("Haciendo la validación");

        if(state.value !== SECURITY_CODE) {
          setState({ ...state, error: true });                                   // Cambiamos los States de loading y error usando la función 'setState' cuando el código de seguridad no sea igual al código de seguridad que tenemos definido, ademas es necesario para no sobreescrbir los otros estados que no estamos cambiando, usar el operador de propagación '...state' para copiar los otros estados que no estamos cambiando
        } else {
          setState({ ...state, error: false, confirmed: true})
        }

        setState((prevState) => ({ ...prevState, loading: false}))               // Usamos un Callback para cambiar 'loading' a false despues de haber ejecutado otro setState, esto por temas de Scopes y Closures, es necesario para no sobreescrbir los otros estados que no estamos cambiando, usar el Spread Operator '...prevState' para copiar los otros estados que no estamos cambiando
        console.log("Terminando la validación");
      }, 1000);
    }

    console.log("Terminando el efecto");
  }, [state.loading]);                                                           // Usamos el Hook 'useEffect' para ejecutar un efecto secundario, el cual recibe una función que se ejecutará cuando se renderice el Componente, y un arreglo de dependencias que se usará para ejecutar el efecto secundario cuando 'state.loading' cambie de valor


  if(!state.deleted && !state.confirmed) {                                       // Si el State 'deleted' y 'confirmed' son false, entonces mostramos la pantalla para eliminar
    return (
      <div>
        <h2>Delete {name}</h2>
        <p>Please, write the security code to probe that you want to delete</p>
  
        { (state.error && !state.loading) && (<p>Error: code is incorrect</p>) }
        { state.loading && (<p>Loading...</p>) }
  
        <input 
          placeholder='Security Code' 
          value={state.value}
          disabled={state.loading}                                                           // Deshabilitamos el input cuando el loading esta cargando y así evitar que el usuario pueda escribir en el input y cuando termine el loading se ponga el anterior
          onChange={(event) => { setState({ ...state, value: event.target.value }) }}        // Cambiamos el valor del State value usando la función 'setValue' cuando el usuario escriba en el input con el valor dentro del input
        />
        <button
          onClick={() => { 
            setState({ ...state, loading: true, error: false })
          }}                              
        >Validate</button>
      </div>
    );
  } else if(!!state.confirmed && !state.deleted) {                                          // Si el State 'confirmed' es true y el State 'deleted' es false, entonces mostramos la pantalla para confirmar que se quiere eliminar
    return(
      <>
        <div>
          <h2>Delete {name}</h2>
          <p>Are you sure you want to delete UseState</p>
    
          <button
            onClick={() => {
              setState({ ...state, deleted: true })
            }}
          >
            Yes, delete
          </button>

          <button
            onClick={() => {
              setState({ ...state, confirmed: false, value: ''})
            }}
          >
            No, go back
          </button>
        </div>
      </>
    );
  } else {                                                                                  // Si el State 'deleted' es true, entonces mostramos la pantalla de que se eliminó correctamente
    return(
      <>
        <div>
          <h2>{name} was deleted</h2>
          <button
            onClick={() => {
              setState({ ...state, confirmed: false, deleted: false, value: ''})
            }}
          >
            Go back, reset
          </button>
        </div>
      </>
    );
  }
  
}

export { UseState };