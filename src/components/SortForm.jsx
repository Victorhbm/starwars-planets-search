import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function SortForm() {
  const { allColumns, setOrder } = useContext(PlanetsContext);
  const [columnSort, setColumnSort] = useState('population');
  const [radioSort, setRadioSort] = useState('ASC');

  function sendForm(e) {
    e.preventDefault();

    const order = {
      column: columnSort,
      sort: radioSort,
    };
    setOrder(order);
  }

  return (
    <form onSubmit={ sendForm }>
      <select
        id="columnSort"
        name="columnSort"
        data-testid="column-sort"
        value={ columnSort }
        onChange={ (e) => setColumnSort(e.target.value) }
      >
        {allColumns.map((col) => (
          <option value={ col } key={ col }>{ col }</option>
        ))}
      </select>

      <label htmlFor="column-sort-input-asc">
        <input
          type="radio"
          id="column-sort-input-asc"
          value="ASC"
          checked={ radioSort === 'ASC' }
          name="radio-sort"
          onChange={ (e) => setRadioSort(e.target.value) }
          data-testid="column-sort-input-asc"
        />
        Ascendente
      </label>

      <label htmlFor="column-sort-input-desc">
        <input
          type="radio"
          id="column-sort-input-desc"
          value="DESC"
          checked={ radioSort === 'DESC' }
          name="radio-sort"
          onChange={ (e) => setRadioSort(e.target.value) }
          data-testid="column-sort-input-desc"
        />
        Descendente
      </label>

      <button type="submit" data-testid="column-sort-button">
        Ordenar
      </button>
    </form>
  );
}

export default SortForm;
