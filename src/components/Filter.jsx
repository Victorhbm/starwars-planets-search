import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const [name, setName] = useState('');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');
  const {
    setFilterByName,
    setFilterByNumericValues,
    filterByNumericValues,
    columns,
    setColumns,
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

  function sendFilter(e) {
    e.preventDefault();

    const newFilterByNumericValues = [
      ...filterByNumericValues,
      {
        column,
        comparison,
        value,
      },
    ];

    setFilterByNumericValues(newFilterByNumericValues);
    filterColumns(newFilterByNumericValues);
    setValue('0');
    setComparison('maior que');
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
