import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const [columns, setColumns] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const { setFilterByName, setFilterByNumericValues } = useContext(PlanetsContext);

  function inputNameChange(event) {
    setName(event.target.value);
    setFilterByName({
      name: event.target.value,
    });
  }

  function sendFilter(e) {
    e.preventDefault();

    setFilterByNumericValues([{
      column,
      comparison,
      value,
    }]);

    const newColumns = columns.filter((col) => col !== column);
    setColumns(newColumns);
  }

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ inputNameChange }
      />
      <form onSubmit={ sendFilter }>
        <label htmlFor="column">
          {'Coluna: '}
          <select
            id="column"
            name="column"
            data-testid="column-filter"
            value={ column }
            onChange={ (e) => setColumn(e.target.value) }
          >
            {columns.map((col) => (
              <option value={ col } key={ col }>{ col }</option>
            ))}
          </select>
        </label>

        <label htmlFor="comparison">
          {'Comparação: '}
          <select
            id="comparison"
            name="comparison"
            data-testid="comparison-filter"
            value={ comparison }
            onChange={ (e) => setComparison(e.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="value">
          {'Valor: '}
          <input
            type="number"
            id="value"
            name="value"
            data-testid="value-filter"
            value={ value }
            onChange={ (e) => setValue(e.target.value) }
          />
        </label>

        <button type="submit" data-testid="button-filter">Filtrar</button>
      </form>
    </div>
  );
}

export default Filter;
