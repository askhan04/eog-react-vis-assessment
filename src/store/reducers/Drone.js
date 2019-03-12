import * as actions from '../actions';

const initialState = {
  loading: false,
  data: [
    {
      timestamp: null,
      metric: null,
      latitude: null,
      longitude: null,
      uom: '',
      accuracy: null
    }
  ]
};

const startLoading = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const droneDataReceived = (state, action) => {
  const { data } = action;
  if (!data) return state;

  return {
    ...state,
    data: [...data],
    loading: false
  };
};

const handlers = {
  [actions.FETCH_DRONE]: startLoading,
  [actions.REFETCH_DRONE]: droneDataReceived,
  [actions.DRONE_DATA_RECEIVED]: droneDataReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
