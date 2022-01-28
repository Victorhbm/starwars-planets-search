import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const allColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [columns, setColumns] = useState(allColumns);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('0');

  const valueToContext = {
    setData,
    data,
    setFilterByName,
    filterByName,
    setFilterByNumericValues,
    filterByNumericValues,
    setColumns,
    columns,
    allColumns,
    setColumn,
    column,
    setComparison,
    comparison,
    setValue,
    value,
  };

  return (
    <PlanetsContext.Provider value={ valueToContext }>
      {children}
    </PlanetsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
