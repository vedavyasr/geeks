import React from 'react';

export default props => {
  let { destinations, dispatch, destname } = props;

  return (
    <div>
      <select
        onChange={e =>
          dispatch({
            type: 'saveDestination',
            payload: { key: destname, value: e.target.value }
          })
        }
      >
        <option value=''>Select</option>
        {destinations.map(({ name, distance }) => {
          return (
            <option key={name} value={name}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};
