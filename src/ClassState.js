import React from 'react';
import { Loading } from './Loading';

// Creamos un Componente de tipo Clase que extiende de React.Component para aprovechar el estado interno y funciones y propiedades que nos ofrece React
class ClassState extends React.Component {

  constructor(props) {                                                                    // Definimos el constructor del Componente el cual recibe las propiedades que se le pasan al Componente                            
    super(props);                                                                         // Llamamos al constructor de la clase padre 'React.Component' y le pasamos las propiedades que recibe el Componente usando super(), cuando queremos modificar el constructor de una clase que extiende de otra clase, siempre debemos llamar al constructor de la clase padre

    this.state = {                                                                        // Definimos el estado inicial del Componente, el cual es un solo 'state' pero adentro podemos tener varios estados dentro de un Objeto
      error: true,                                                                        // Definimos el estado 'error' con valor inicial 'true'
      loading: false
    }
  }

  // Métodos del ciclo de vida de un Componente de Clase

  // UNSAFE_componentWillMount() {                                                        // Para evitar que nos aparezca el Warning de que el método 'componentWillMount' está obsoleto, le agregamos el prefijo 'UNSAFE_' al nombre del método
  //   console.log("ComponentWillMount");
  // }

  // componentDidMount() {
  //   console.log("ComponentDidMount");
  // }

  componentDidUpdate() {                                                                  // Este método se va a ejecutar cuando el Componente se actualice, como cuando cambiamos el State que hace que aparezca el Loading
    console.log("Actualización");

    if(!!this.state.loading){                                                             // Para evitar un bucle infinito de actualizaciones, solo vamos a ejecutar el código si el loading esta cargando, en donde vamos a cambiar el State de 'loading' a false si el loading esta cargando, esto lo hacemos simulando una petición a un servidor usando un setTimeout de 2000 milisegundos
      setTimeout(() => {
        console.log("Haciendo la validación");
        this.setState({ loading: false });                                                // Usamos la función 'setState' para cambiar el estado de 'loading' a false
        console.log("Terminando la validación");
      }, 2000);
    }
  }

  render() {                                                                              // Llamamos al método 'render()' para retornar el JSX que se renderizará en el DOM
    return (
      <div>
        <h2>Delete {this.props.name}</h2>                                                 {/* Accedemos a las propiedades del Componente usando 'this.props' */}
        <p>Please, write the security code to probe that you want to delete</p>

        { this.state.error && (<p>Error: Code is incorrect</p>)}      

        { this.state.loading && (<Loading />)}                                            {/* En vez de mostrar directamente los elementos de un loading vamos a crear y llamar a un Componente 'Loading' el cual usará el método de ciclo de vida 'ComponentWillUnmount()'*/}   

        <input placeholder='Security Code' />
        <button
          onClick={ () => this.setState({ loading: true }) }     // Usamos la función 'setState' para cambiar el estado de 'error' a su valor contrario, para esto usamos una función que recibe el estado anterior y retorna el nuevo estado al negar. esto usando una Arrow Function
        >Validate</button>
      </div>
    )
  }
}

export { ClassState };