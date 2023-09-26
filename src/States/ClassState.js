import React from 'react';
import '../Styles/App.css';
import { Loading } from '../Loading';

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {                                                    // Creamos un Componente de tipo Clase que extiende de React.Component para aprovechar el estado interno y funciones y propiedades que nos ofrece React

  constructor(props) {                                                                        // Definimos el constructor del Componente el cual recibe las propiedades que se le pasan al Componente                            
    super(props);                                                                             // Llamamos al constructor de la clase padre 'React.Component' y le pasamos las propiedades que recibe el Componente usando super(), cuando queremos modificar el constructor de una clase que extiende de otra clase, siempre debemos llamar al constructor de la clase padre
    this.state = {                                                                            // Definimos el estado inicial del Componente, el cual es un solo 'state' pero adentro podemos tener varios estados dentro de un Objeto
      value: '',                                                                              // Definimos el estado 'value' que es de nuestro input con valor inicial vacío
      error: false,                                                                           // Definimos el estado 'error' con valor inicial 'true'
      loading: false,
      deleted: false,
      confirmed: false
    }
  }

  /* Métodos del ciclo de vida de un Componente de Clase

  UNSAFE_componentWillMount() {                                                               // Para evitar que nos aparezca el Warning de que el método 'componentWillMount' está obsoleto, le agregamos el prefijo 'UNSAFE_' al nombre del método
    console.log("ComponentWillMount");
  }
  componentDidMount() {
    console.log("ComponentDidMount");
  } 
  */

  componentDidUpdate() {                                                                      // Este método se va a ejecutar cuando el Componente se actualice, como cuando cambiamos el State que hace que aparezca el Loading
    console.log("Actualización");

    if(!!this.state.loading){                                                                 // Para evitar un bucle infinito de actualizaciones, solo vamos a ejecutar el código si el loading esta cargando, en donde vamos a cambiar el State de 'loading' a false si el loading esta cargando, esto lo hacemos simulando una petición a un servidor usando un setTimeout de 2000 milisegundos
      setTimeout(() => {
        console.log("Haciendo la validación");
        
        if(SECURITY_CODE === this.state.value) {
          this.setState({ ...this.state, error: false, loading: false, confirmed: true });
        } else {
          this.setState({ error: true, loading: false});
        }
        console.log("Terminando la validación");
      }, 1000);
    }
  }

  // Estos son los métodos que vamos a usar para cambiar el estado del Componente, estos métodos van a ser llamados cuando el usuario haga click en los botones y así evitar el error de que no se puede cambiar el estado directamente
  handleDeleteConfirmation = () => {
    this.setState({ deleted: true, value: '' });
  }
  handleReset = () => {
    this.setState({ deleted: false, confirmed: false, value: '' })
  }
  handleLoad = () => {
    this.setState({ loading: true })
  }

  render() {                                                                                      // Llamamos al método 'render()' para retornar el JSX que se renderizará en el DOM
    const {error, loading, value } = this.state;                                                  // Desestructuramos el estado del Componente para acceder a sus propiedades y asi ya no tener que escribir 'this.state' cada vez que queramos acceder a una propiedad del estado 

    if(!this.state.deleted && !this.state.confirmed) { 
      return (
        <div className='stateContainer container-background-3'>
          <h2>Delete {this.props.name}</h2>                                                       {/* Accedemos a las propiedades del Componente usando 'this.props' */}
          <p className='askCodeLabel'>Please, write the security code to probe that you want to delete</p>

          { (this.state.error && !this.state.loading) && (<p className='errorState'>Error: Code is incorrect</p>)}      
          { this.state.loading && (<Loading />)}                                                  {/* En vez de mostrar directamente los elementos de un loading vamos a crear y llamar a un Componente 'Loading' el cual usará el método de ciclo de vida 'ComponentWillUnmount()'*/}   

          <input 
            placeholder='Security Code' 
            value={ this.state.value }
            onChange={ (event) => {this.setState({ value: event.target.value })} }                // Cambiamos el valor de 'value' usando la función 'setState' y pasandole el nuevo valor de 'value' cuando el usuario escriba en el input con el valor dentro del input
            disabled={this.state.loading}   
          />
          <button onClick={ this.handleLoad }>                                                    {/* Llamamos a la función 'handleLoad' cuando el usuario haga click en el botón y har´que el estado de 'loading' cambie a true */}    
            Validate
          </button>
        </div>
      )
    } else if(!!this.state.confirmed && !this.state.deleted) {
      return(
        <>
          <div className='stateContainer container-background-3'>
            <h2>Delete {this.props.name}</h2>
            <p className='deleteConfirmationLabel'>Are you sure you want to delete UseState?</p>
            <div>
              <button onClick={this.handleDeleteConfirmation}>
                Yes, delete
              </button>
              <button onClick={this.handleReset}>
                No, go back
              </button>
            </div>
          </div>
        </>
      );
    } else {
      return(
        <>
          <div className='stateContainer container-background-3'>
            <h2>{this.props.name} was deleted</h2>
            <button className='resetBtn' onClick={this.handleReset}>
              Go back, reset
            </button>
          </div>
        </>
      );
    }
    
  }
}

export { ClassState };