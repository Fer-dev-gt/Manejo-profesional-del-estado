import React from 'react';
import './App.css';
import { UseState } from './UseState';
import { ClassState } from './ClassState';
import { UseReducer } from './UseReducer';

function App() {
  return (
    <div className="App">
      <UseReducer name="UseReducer with 'Reducer Object'"/>
      <UseState name="UseState"/>
      <ClassState name="ClassState"/>                                        {/* Componente creado usando Class que extends de 'React.Component', las propiedades se mandan de las misma manera que con un Componente por función */}
    </div>
  );
}

export default App;