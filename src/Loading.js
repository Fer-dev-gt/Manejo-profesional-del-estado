import React from 'react';

class Loading extends React.Component {

  componentWillUnmount() {                                                                // Este método se va a ejecutar cuando el Componente se desmonte del DOM como cuando cambiamos el State que hace que aparezca el Loading
    console.log("ComponentWillUnmount");
  }

  render() {                                                                              // Llamamos al método 'render()' para retornar el JSX que se renderizará en el DOM
    return (
      <p>Loading...</p>
    )
  }
}

export { Loading };