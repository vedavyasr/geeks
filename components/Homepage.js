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
                destination1: JSON.parse(JSON.stringify(response.data)),
                destination2: JSON.parse(JSON.stringify(response.data)),
                destination3: JSON.parse(JSON.stringify(response.data)),
                destination4: JSON.parse(JSON.stringify(response.data))
              }
            });
            dispatch({
              type: 'constVehicles',
              payload: JSON.parse(JSON.stringify(response.data))
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }, []);

  function saveVehicle(value, key) {
    let newVehicles = { ...vehicles };
    let newStore = { ...vehicleStore };
    let Vehicles = newVehicles[key];
console.log(key)
    Vehicles.map(vehicle => {
      if (vehicle.name === value) {
        if (vehicle['total_no']) --vehicle['total_no'];
      } else {
        newStore[key].forEach(val => {
          if (val.name !== value && vehicle.name === val.name) {
            vehicle['total_no'] = val.total_no;
          }
        });
      }
    });
    let keys = key.split('destination');
    for (let i = keys[1]; i <= 4; i++) {
      let str = 'destination' + i;

      newVehicles[str] = Vehicles;
    }
    console.log(vehicles,newVehicles,'newVehicles')
    dispatch({ type: 'storeVehicles', payload: newVehicles });
  }
  console.log(Store);
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
