// Creamos un Objeto que contiene el estado inicial del Componente, es un State complejo porque tiene varios estados dentro de un Objeto
const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false
};

// Hay 3 formas de usar el UseReducer (la más obvia): 
const reducerConIf = (state, action) => {                             // Los reducer siempre reciben 2 parámetros, el estado actual y la acción que se va a ejecutar
  if (action.type === 'ERROR') {
    return { ...state, error: true, loading: false };                 // Si la acción es 'ERROR', entonces retornamos el estado actual con el error en true y el loading en false
  } else if(action.type === 'CHECK') {
    return { ...state, loading: true };
  } else {                                                            // Este será el default, si la acción no es ninguna de las anteriores, entonces retornamos el estado inicial, existen otros tipo de acciones como 'RESET', 'CONFIRM', 'DELETE', etc.
    return { ...initialState };                                       // Tambien podemos retornar simplemente el estado actual usando 'return state'
  }
};


// Segunda forma, la forma más popular de usar el UseReducer:
const reducerSwitch = (state, action) => {
  switch(action.type) {                                                // Usamos un Switch para evaluar la acción (action.type) que se va a ejecutar 
    case 'ERROR':
      return { ...state, error: true, loading: false };
    case 'CHECK':
      return { ...state, loading: true };
    default:                                                           // Este será el default, si la acción no es ninguna de las anteriores, entonces retornamos el estado inicial, existen otros tipo de acciones como 'RESET', 'CONFIRM', 'DELETE', etc.
      return { ...initialState };                                      // Tambien podemos retornar simplemente el estado actual usando 'return state'
  }
};  


// Tercera forma, la forma más completa de usar el UseReducer y favorita del profesor, esta es la primera parte donde creamos un Objeto que contiene las acciones y el estado que se va a retornar:
const reducerObject = (state, action) => ({                             // Usamos un Objeto para evaluar la acción (action.type) que se va a ejecutar, le retornamos implicitamente al Objeto usando '()' en vez de '{}' y así ya no escribir return
  'ERROR': { ...state, error: true, loading: false },                   // El formato que usamos será de key: value, donde la key será el nombre de la acción y el value será el estado que se va a retornar
  'CHECK': { ...state, loading: true },
});
// Esta es la segunda parte donde creamos una función que va a evaluar si la acción existe en el Objeto, si existe, entonces retornamos el estado que se va a retornar, si no existe, entonces retornamos el estado actual:
const reducerSecondPart = (state, action) => {
  if(reducerObject(state)[action.type]) {                               // Verificamos que la acción exista en el Objeto usando 'reducerObject(state)[action.type]', si existe, entonces retornamos el estado que se va a retornar, al ejecutar la función esta retorna el Objeto que contiene las acciones y el estado que se va a retornar, y al pasarle la acción como parámetro, entonces nos retorna el estado que se va a retornar
    return reducerObject(state)[action.type];
  } else {
    return state;
  }
};




// Estos son todos los casos posibles de un UseReducer:
const reducerSwitchCompleto = (state, action) => {
  switch(action.type) {
    case 'ERROR':
      return { ...state, error: true, loading: false };
    case 'CHECK':
      return { ...state, loading: true };
    case 'RESET':
      return { ...initialState };
    case 'CONFIRM':
      return { ...state, confirmed: true };
    case 'DELETE':
      return { ...state, deleted: true };
    default: 
      return { ...initialState };
  }
};