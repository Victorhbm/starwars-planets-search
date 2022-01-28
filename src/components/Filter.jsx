import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import FilterForm from './FilterForm';

function Filter() {
  const [name, setName] = useState('');
  const {
    setFilterByName,
    setFilterByNumericValues,
    filterByNumericValues,
    setColumns,
    setColumn,
    allColumns,
  } = useContext(PlanetsContext);

  function inputNameChange(event) {
    setName(event.target.value);
    setFilterByName({
      name: event.target.value,
    });
  }

  function filterColumns(filterNumeric) {
    const newFilterColumns = allColumns
      .filter((item) => !filterNumeric
        .some((el) => el.column === item));
    setColumns(newFilterColumns);

    setColumn(newFilterColumns[0]);
  }

  async function removeFilter(fil) {
    const removeSelectedFilter = filterByNumericValues.filter((filter) => filter !== fil);

    setFilterByNumericValues(removeSelectedFilter);
    filterColumns(removeSelectedFilter);
  }

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ inputNameChange }
      />

      <FilterForm />

      {filterByNumericValues.length > 0 && (
        <div>
          <p>Filtros:</p>
          {filterByNumericValues.map((fil) => (
            <div key={ fil.column } data-testid="filter">
              <span>{`${fil.column} ${fil.comparison} ${fil.value}`}</span>
              <button
                type="button"
                onClick={ () => removeFilter(fil) }
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Filter;
