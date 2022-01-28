import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterForm() {
  const {
    setFilterByNumericValues,
    filterByNumericValues,
    setColumns,
    columns,
    column,
    setColumn,
    allColumns,
    setComparison,
    comparison,
    setValue,
    value,
  } = useContext(PlanetsContext);

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

  return (
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
  );
}

export default FilterForm;
