import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiDetails from '../configs/apiConfigs';
export default () => {
  let [destinations, setDestinations] = useState([]);
  let [selectedDestinations, setSelected] = useState({
    destination1: ''
  });

  useEffect(() => {
    axios
      .get(apiDetails.getPlanets.url)
      .then(res => setDestinations(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {destinations.length && (
        <div>
          <select
            onChange={e => {
              setSelected({
                destination1: e.target.value
              });
            }}
          >
            <option>Select</option>
            {Object.keys(selectedDestinations).map(val =>
              destinations.map(dest => {
                return (
                  selectedDestinations[val] !== dest.name && (
                    <option key={dest.name}>{dest.name}</option>
                  )
                );
              })
            )}
          </select>
          <select
            onChange={e => {
              setSelected({
                destination1: e.target.value
              });
            }}
          >
            <option>Select</option>
            {Object.keys(selectedDestinations).map(val =>
              destinations.map(dest => {
                return (
                  selectedDestinations[val] !== dest.name && (
                    <option key={dest.distance}>{dest.name}</option>
                  )
                );
              })
            )}
          </select>
        </div>
      )}
    </div>
  );
};
