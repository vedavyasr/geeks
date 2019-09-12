import React, { useReducer, useEffect } from 'react';
import Inputcomponent from './Inputcomponent';
import VehiclesComponent from './VehiclesComponent';
import axios from 'axios';
import apiDetails from '../configs/apiConfigs';
import { reducer, initialState } from './reducers/mainReducer';

export default () => {
  const [Store, dispatch] = useReducer(reducer, initialState);
  let { destinations, vehicles, saveDestinations, vehicleStore } = Store;
  useEffect(() => {
    axios
      .get(apiDetails.getPlanets.url)
      .then(res => {
        dispatch({ type: 'storeDestinations', payload: res.data });
        axios
          .get(apiDetails.getVehicles.url)
          .then(response => {
            dispatch({
              type: 'storeVehicles',
              payload: {
                key: 'destination1',
                value: JSON.parse(JSON.stringify(response.data))
              }
            });
            dispatch({
              type: 'constVehicles',
              payload: JSON.parse(JSON.stringify(res.data))
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, []);

  function saveVehicle(value, key) {
    Object.keys(vehicles).map(val => {
      if (val === key) {
        vehicles[val].map(vehicle => --vehicle['total_no']);
      }
    });
    console.log(vehicles);
    dispatch({
      type: 'storeVehicles',
      payload: { key: key, value: vehicles[key] }
    });
  }

  return (
    <div>
      {destinations.length && (
        <>
          <Inputcomponent
            destname='destination1'
            destinations={destinations}
            dispatch={dispatch}
          />

          {saveDestinations.destination1 &&
            vehicles.destination1.map(vehicle => (
              <VehiclesComponent
                destname='destination1'
                details={vehicle}
                key={vehicle.name}
                saveVehicle={saveVehicle}
                dispatch={dispatch}
              />
            ))}
        </>
      )}
      {destinations.length && (
        <>
          <Inputcomponent
            destname='destination2'
            destinations={destinations}
            dispatch={dispatch}
          />

          {saveDestinations.destination2 &&
            vehicles.destination2.map(vehicle => (
              <VehiclesComponent
                destname='destination2'
                details={vehicle}
                key={vehicle.name}
                saveVehicle={saveVehicle}
                dispatch={dispatch}
              />
            ))}
        </>
      )}
    </div>
  );
};
