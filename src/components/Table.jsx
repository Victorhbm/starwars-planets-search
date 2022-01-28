import React, { useContext, useEffect, useCallback } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import fetchPlanets from '../services/API';

export default function Table() {
  const {
    data,
    filterByName,
    filterByNumericValues,
    setData,
  } = useContext(PlanetsContext);

  const getPlanets = useCallback(
    async () => {
      const planets = await fetchPlanets();
      setData(planets);
    }, [setData],
  );

  useEffect(() => {
    getPlanets();
  }, [getPlanets]);

  /*
  Logica de filterPlanets desenvolvida atraves da seguinte referencia:
  https://dev.to/icelandico/filter-array-of-objects-with-multiple-conditions-4go3
  */
  function filterPlanets() {
    if (filterByNumericValues.length > 0 && data.length > 0) {
      const filteredResults = data
        .filter((el) => filterByNumericValues
          .every((filterEl) => {
            switch (filterEl.comparison) {
            case 'maior que':
              return Number(el[filterEl.column]) > Number(filterEl.value);
            case 'menor que':
              return Number(el[filterEl.column]) < Number(filterEl.value);
            default:
              return Number(el[filterEl.column]) === Number(filterEl.value);
            }
          }));
      return filteredResults;
    }

    return data;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {filterPlanets()
          .filter((planet) => (
            planet.name.toLowerCase().includes(filterByName.name.toLowerCase())
          ))
          .map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films.join(', ')}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
