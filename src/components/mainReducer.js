export const initialState = {
  vehicles: {
    destination1: [],
    destination2: [],
    destination3: [],
    destination4: []
  },
  vehicleStore: [],
  destinations: [],
  saveDestinations: {}
};
export const reducer = (state = initialState, action) => {
  let newState = { ...state };
  console.log(action.type)
  switch (action.type) {
    case 'storeDestinations':
      newState.destinations = action.payload;
      return { ...newState };
    case 'storeVehicles':
      newState.vehicles[action.payload.key] = action.payload.value;
      console.log(newState, 'yyyyyyyyyyyyyyyy');
      return { ...newState };
    case 'constVehicles':
      return { ...newState };
    case 'saveDestination':
      newState.saveDestinations[action.payload.key] = action.payload.value;
      return { ...newState };
    case 'saveVehicle':
      newState.vehicles = action.payload;

      return { ...newState };
    default:
      throw new Error('Unexpected action');
  }
};
