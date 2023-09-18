import React from 'react';

// Creamos un Componente de tipo Clase que extiende de React.Component para aprovechar el estado interno y funciones y propiedades que nos ofrece React
class ClassState extends React.Component {

  constructor(props) {                                                                    // Definimos el constructor del Componente el cual recibe las propiedades que se le pasan al Componente                            
    super(props);                                                                         // Llamamos al constructor de la clase padre 'React.Component' y le pasamos las propiedades que recibe el Componente usando super(), cuando queremos modificar el constructor de una clase que extiende de otra clase, siempre debemos llamar al constructor de la clase padre

    this.state = {                                                                        // Definimos el estado inicial del Componente, el cual es un solo 'state' pero adentro podemos tener varios estados dentro de un Objeto
      error: true,                                                                        // Definimos el estado 'error' con valor inicial 'true'
    }
  }

  render() {                                                                              // Llamamos al método 'render()' para retornar el JSX que se renderizará en el DOM
    return (
      <div>
        <h2>Delete {this.props.name}</h2>                                                 {/* Accedemos a las propiedades del Componente usando 'this.props' */}
        <p>Please, write the security code to probe that you want to delete</p>

        { this.state.error && (<p>Error: Code is incorrect</p>)}                 

        <input placeholder='Security Code' />
        <button
          onClick={ () => this.setState(prevState => ({ error: !prevState.error })) }     // Usamos la función 'setState' para cambiar el estado de 'error' a su valor contrario, para esto usamos una función que recibe el estado anterior y retorna el nuevo estado al negar. esto usando una Arrow Function
        >Validate</button>
      </div>
    )
  }
}

export { ClassState };