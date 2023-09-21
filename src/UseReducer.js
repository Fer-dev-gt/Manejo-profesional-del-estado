import React from 'react';

const SECURITY_CODE = 'paradigma';

// Creamos un Objeto que contiene el estado inicial del Componente, es un State complejo porque tiene varios estados dentro de un Objeto
const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false
};

const actionTypes = {
  error: 'ERROR',
  check: 'CHECK',
  write: 'WRITE',
  delete: 'DELETE',
  reset: 'RESET',
  confirm: 'CONFIRM',
  finish_loading: 'FINISH_LOADING'
}

const reducerObject = (state, payload) => ({                                     // Usamos un Objeto para evaluar la acción (action.type) que se va a ejecutar, le retornamos implicitamente al Objeto usando '()' en vez de '{}' y así ya no escribir return
  [actionTypes.confirm]: { ...state, error: false, loading: false, confirmed: true },
  [actionTypes.error]: { ...state, error: true, loading: false },                            // El formato que usamos será de key: value, donde la key será el nombre de la acción y el value será el estado que se va a retornar
  [actionTypes.check]: { ...state, loading: true },
  [actionTypes.write]: { ...state, value: payload },
  [actionTypes.delete]: { ...state, deleted: true },
  [actionTypes.reset]: { ...state, confirmed: false, deleted: false, value: ''},
  [actionTypes.finish_loading]: { ...state, loading: false }
});

const reducer = (state, action) => {
  if(reducerObject(state)[action.type]) {                                         // Verificamos que la acción exista en el Objeto usando 'reducerObject(state)[action.type]', si existe, entonces retornamos el estado que se va a retornar, al ejecutar la función esta retorna el Objeto que contiene las acciones y el estado que se va a retornar, y al pasarle la acción como parámetro, entonces nos retorna el estado que se va a retornar
    return reducerObject(state, action.payload)[action.type];                     // Retornamos el action type junto su 'action.payload' para usarlo en el 'reducerObject' si queremos que sea más dinámico el cambio del state
  } else {
    return state;
  }
};


function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);              // Usamos el Hook 'useReducer' para crear un solo 'state' que maneja varios estados, el cual recibe un reducer y un estado inicial, y retorna un estado y un dispatch, el cual es una función que se usa para ejecutar las acciones que se van a ejecutar en el 'reducer', el 'dispatch' va a reemplazar al 'setState' que usamos en el 'useState'



  React.useEffect(() => {
    console.log("Empezando el efecto");

    if(!!state.loading){                                                           // Para evitar un bucle infinito de actualizaciones, solo vamos a ejecutar el código si el loading esta cargando, en donde vamos a cambiar el State de 'loading' a false si el loading esta cargando, esto lo hacemos simulando una petición a un servidor usando un setTimeout de 2000 milisegundos, hacemos una doble negación para convertir el valor a booleano
      setTimeout(() => {
        console.log("Haciendo la validación");

        if(state.value !== SECURITY_CODE) {
          dispatch({ type: actionTypes.error });                                             // Usamos el 'dispatch' para ejecutar las acciones que se van a ejecutar en el 'reducer', en este caso ejecutamos la acción 'ERROR'
        } else {
          dispatch({ type: actionTypes.confirm });                                           // Usamos el 'dispatch' para ejecutar las acciones que se van a ejecutar en el 'reducer', en este caso ejecutamos la acción 'CONFIRM'
        }

        dispatch({ type: actionTypes.finish_loading });                                      // Aplicamos el mismo concepto de arriba para cambiar el 'loading' a false despues de haber ejecutado otro 'dispatch', esto por temas de Scopes y Closures, es necesario para no sobreescrbir los otros estados que no estamos cambiando
        console.log("Terminando la validación");
      }, 1000);
    }

    console.log("Terminando el efecto");
  }, [state.loading]);                                                             // Usamos el Hook 'useEffect' para ejecutar un efecto secundario, el cual recibe una función que se ejecutará cuando se renderice el Componente, y un arreglo de dependencias que se usará para ejecutar el efecto secundario cuando 'state.loading' cambie de valor


  if(!state.deleted && !state.confirmed) {                                         // Si el State 'deleted' y 'confirmed' son false, entonces mostramos la pantalla para eliminar
    return (
      <div>
        <h2>Delete {name}</h2>
        <p>Please, write the security code to probe that you want to delete</p>
  
        { (state.error && !state.loading) && (<p>Error: code is incorrect</p>) }
        { state.loading && (<p>Loading...</p>) }
  
        <input 
          placeholder='Security Code' 
          value={state.value}
          disabled={state.loading}                                                          // Deshabilitamos el input cuando el loading esta cargando y así evitar que el usuario pueda escribir en el input y cuando termine el loading se ponga el anterior
          onChange={(event) => { 
            dispatch({ type: actionTypes.write, payload: event.target.value });                       // Usamos el 'dispatch' para ejecutar las acciones que se van a ejecutar en el 'reducer', la acción es 'WRITE' y usamos el 'payload' para pasarle el valor del input
          }}
        />
        <button
          onClick={() => { 
            dispatch({ type: actionTypes.check });                                                    // Usamos el 'dispatch' para ejecutar las acciones que se van a ejecutar en el 'reducer', la acción es 'CHECK'
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
              dispatch({ type: actionTypes.delete });
            }}
          >
            Yes, delete
          </button>

          <button
            onClick={() => {
              dispatch({ type: actionTypes.reset });
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
              dispatch({ type: actionTypes.reset });
            }}
          >
            Go back, reset
          </button>
        </div>
      </>
    );
  }
}

export { UseReducer };