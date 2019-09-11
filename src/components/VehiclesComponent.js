import React from 'react';

export default props => {
  let { destname, details, saveVehicle } = props;

  return (
    <label>
      <input
        type='radio'
        name={destname}
        key={details.name}
        value={details.name}
        onChange={e => saveVehicle(e.target.value, destname)}
      />
      {details.name}({details.total_no})
    </label>
  );
};
