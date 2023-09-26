import React from 'react';
import '../Styles/States.css';

const SECURITY_CODE = 'paradigma';

function UseState({name}) {
  const [state, setState] = React.useState({                                     // Forma de usar el Hook 'useState' para crear un solo 'state' que maneja varios estados
    value: '',
    error: false,
    loading: false,
    deleted: false,                                                              // State para mostrar pantalla de que se eliminó correctamente
    confirmed: false                                                             // State para mostrar pantalla para confirmar que se quiere eliminar
  });

  // Estas Arrow Functions guardadas dentro de variables van a convertir nuestro código a 'semi-declarativo' ya que vamos a poder reutilizarlas en varios lugares de nuestro código
  const onConfirm = () => {
    setState({ ...state, error: false,  confirmed: true });
  }

  const onError = () => {
    setState({ ...state, error: true});
  }

  const onWrite = (event) => {
    setState({ ...state, value: event.target.value });
  }

  const onCheck = () => {
    setState({ ...state, loading: true });
  }

  const onDelete = () => {
    setState({ ...state, deleted: true });
  }

  const onReset = () => {
    setState({ ...state, confirmed: false, deleted: false, value: ''})
  }

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if(!!state.loading){                                                         // Para evitar un bucle infinito de actualizaciones, solo vamos a ejecutar el código si el loading esta cargando, en donde vamos a cambiar el State de 'loading' a false si el loading esta cargando, esto lo hacemos simulando una petición a un servidor usando un setTimeout de 2000 milisegundos, hacemos una doble negación para convertir el valor a booleano
      setTimeout(() => {
        console.log("Haciendo la validación");

        if(state.value !== SECURITY_CODE) {
          onError();                                                             // Usamos las Arrow Functions guardadas dentro de variables para cambiar el estado de 'error' a true
        } else {
          onConfirm();                                                           // Usamos las Arrow Functions guardadas dentro de variables para cambiar el estado de 'confirmed' a true
        }

        setState((prevState) => ({ ...prevState, loading: false}))               // Usamos un Callback para cambiar 'loading' a false despues de haber ejecutado otro setState, esto por temas de Scopes y Closures, es necesario para no sobreescrbir los otros estados que no estamos cambiando, usar el Spread Operator '...prevState' para copiar los otros estados que no estamos cambiando
        console.log("Terminando la validación");
      }, 1000);
    }

    console.log("Terminando el efecto");
  }, [state.loading]);                                                           // Usamos el Hook 'useEffect' para ejecutar un efecto secundario, el cual recibe una función que se ejecutará cuando se renderice el Componente, y un arreglo de dependencias que se usará para ejecutar el efecto secundario cuando 'state.loading' cambie de valor


  if(!state.deleted && !state.confirmed) {                                       // Si el State 'deleted' y 'confirmed' son false, entonces mostramos la pantalla para eliminar
    return (
      <div className='stateContainer container-background-2'>
        <h2>Delete {name}</h2>
        <p className='askCodeLabel'>Please, write the security code to probe that you want to delete</p>
  
        { (state.error && !state.loading) && (<p className='errorState'>Error: code is incorrect</p>) }
        { state.loading && (<p>Loading...</p>) }
  
        <input 
          placeholder='Security Code' 
          value={state.value}
          disabled={state.loading}                                                           // Deshabilitamos el input cuando el loading esta cargando y así evitar que el usuario pueda escribir en el input y cuando termine el loading se ponga el anterior
          onChange={(event) => { onWrite(event); }}                                          // Usamos la Arrow Function guardada dentro de una variable para cambiar el estado de 'value' cuando el usuario escriba en el input
        />
        <button onClick={onCheck}>
          Validate
        </button>
      </div>
    );
  } else if(!!state.confirmed && !state.deleted) {                                          // Si el State 'confirmed' es true y el State 'deleted' es false, entonces mostramos la pantalla para confirmar que se quiere eliminar
    return(
      <>
        <div className='stateContainer container-background-2'>
          <h2>Delete {name}</h2>
          <p className='deleteConfirmationLabel'>Are you sure you want to delete UseState?</p>
          <div>
            <button onClick={onDelete}>
              Yes, delete
            </button>

            <button onClick={onReset}>
              No, go back
            </button>  
          </div>      
        </div>
      </>
    );
  } else {                                                                                  // Si el State 'deleted' es true, entonces mostramos la pantalla de que se eliminó correctamente
    return(
      <>
        <div className='stateContainer container-background-2'>
          <h2>{name} was deleted</h2>
          <button className='resetBtn' onClick={onReset}>
            Go back, reset
          </button>
        </div>
      </>
    );
  }
  
}

export { UseState };