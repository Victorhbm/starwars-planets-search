import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const [name, setName] = useState('');
  const { setFilterByName } = useContext(PlanetsContext);

  function handleChange(event) {
    setName(event.target.value);
    setFilterByName({
      name: event.target.value,
    });
  }

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ handleChange }
      />
    </div>
  );
}

export default Filter;
