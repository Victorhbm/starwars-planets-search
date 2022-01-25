import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import fetchPlanets from '../services/API';
import PlanetsContext from './PlanetsContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([{
    column: '',
    comparison: '',
    value: '0',
  }]);

  async function getPlanets() {
    const planets = await fetchPlanets();
    setData(planets);
  }

  useEffect(() => {
    getPlanets();
  }, []);

  const valueToContext = {
    data,
    setFilterByName,
    filterByName,
    setFilterByNumericValues,
    filterByNumericValues,
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
