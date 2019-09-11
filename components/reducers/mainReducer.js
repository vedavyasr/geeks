export const initialState = {
  vehicles: {
    destination1: [],
    destination2: [],
    destination3: [],
    destination4: []
  },
  vehicleStore: {
    destination1: [],
    destination2: [],
    destination3: [],
    destination4: []
  },
  destinations: [],
  saveDestinations: {}
};
export const reducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case 'storeDestinations':
      newState.destinations = action.payload;
      return { ...newState };
    case 'storeVehicles':
      newState.vehicles = action.payload;
      return { ...newState };
    case 'constVehicles':
      newState.vehicleStore.destination1 = action.payload;
      newState.vehicleStore.destination2 = action.payload;
      newState.vehicleStore.destination3 = action.payload;
      newState.vehicleStore.destination4 = action.payload;
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
