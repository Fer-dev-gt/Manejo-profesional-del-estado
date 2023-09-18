import React from 'react';

class ClassState extends React.Component {
  render() {
    return (
      <div>
        <h2>Delete ClassState</h2>
        <p>Please, write the security code to probe that you want to delete</p>
        <input placeholder='Securty Code' />
        <button>Validate</button>
      </div>
    )
  }
}

export { ClassState };