import React from 'react';
import { UseState } from './States/UseState';
import { ClassState } from './States/ClassState';
import { UseReducer } from './States/UseReducer';

function App() {
  return (
    <div className="App">
      <h1>States</h1>
      <UseReducer name="UseReducer with 'Reducer Object'"/>
      <UseState name="UseState"/>
      <ClassState name="ClassState"/>                                        {/* Componente creado usando Class que extends de 'React.Component', las propiedades se mandan de las misma manera que con un Componente por función */}
    </div>
  );
}

export default App;