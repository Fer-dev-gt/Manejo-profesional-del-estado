import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({name}) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  console.log(value);

  React.useEffect(() => {
    console.log("Empezando el efecto");

    if(!!loading){                                                    // Cambiamos el estado de 'loading' a false si el loading esta cargando, esto lo hacemos simulando una petición a un servidor usando un setTimeout de 2000 milisegundos
      setTimeout(() => {
        console.log("Haciendo la validación");

        if(value !== SECURITY_CODE) setError(true);                   // Mostramos el error si el código no es correcto al security code establecido
        setLoading(false);                                            // Siempre que terminamos de hacer la validación, cambiamos el estado de 'loading' a false

        console.log("Terminando la validación");
      }, 2000);
    }

    console.log("Terminando el efecto");
  }, [loading]);                                                      // Usamos el Hook 'useEffect' para ejecutar un efecto secundario, el cual recibe una función que se ejecutará cuando se renderice el Componente, y un arreglo de dependencias que se usará para ejecutar el efecto secundario cuando alguna de las dependencias cambie de valor


  return (
    <div>
      <h2>Delete {name}</h2>
      <p>Please, write the security code to probe that you want to delete</p>

      { (error && !loading) && (<p>Error: code is incorrect</p>) }

      { loading && (<p>Loading...</p>) }

      <input 
        placeholder='Security Code' 
        value={value}
        onChange={(event) => { setValue(event.target.value) }}        // Cambiamos el valor del State value usando la función 'setValue' cuando el usuario escriba en el input con el valor dentro del input
      />
      <button
        onClick={() => { 
          setLoading(true);                                     // Usamos el Hook 'useState' para cambiar el estado de 'loading' a true
          setError(false);                                      // Cada vez que validemos el código, vamos a cambiar el estado de 'error' a false
        }}                              
      >Validate</button>
    </div>
  );
}

export { UseState };