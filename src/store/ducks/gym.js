export const Types = {
  GET_GYMS_REQUEST: 'gym/GET_GYMS_REQUEST',
  GET_GYMS_SUCCESS: 'gym/GET_GYMS_SUCCESS',
  GET_GYMS_FAILURE: 'gym/GET_GYMS_FAILURE',
  POST_GYM_ACTIVTY_REQUEST: 'gym/POST_GYM_ACTIVTY_REQUEST',
  POST_GYM_ACTIVTY_SUCCESS: 'gym/POST_GYM_ACTIVTY_SUCCESS',
  POST_GYM_ACTIVTY_FAILURE: 'gym/POST_GYM_ACTIVTY_FAILURE',
};

export const INITIAL_STATE = {
  list: [],
  loading: false,
  error: null,
};

export default function gym(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.GET_GYMS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.GET_GYMS_SUCCESS:
      return {
        ...state,
        list: action.payload.list,
        loading: false,
      };
    case Types.GET_GYMS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case Types.POST_GYM_ACTIVTY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.POST_GYM_ACTIVTY_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case Types.POST_GYM_ACTIVTY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

export const Creators = {
  getGymsRequest: () => ({
    type: Types.GET_GYMS_REQUEST,
  }),
  getGymsSuccess: list => ({
    type: Types.GET_GYMS_SUCCESS,
    payload: {
      list,
    },
  }),
  getGymsFailure: error => ({
    type: Types.GET_GYMS_FAILURE,
    payload: {
      error,
    },
  }),
  postGymActivityRequest: (idGym, idActivity) => ({
    type: Types.POST_GYM_ACTIVTY_REQUEST,
    payload: {
      idGym,
      idActivity,
    },
  }),
  postGymActivitySuccess: () => ({
    type: Types.POST_GYM_ACTIVTY_SUCCESS,
  }),
  postGymActivityFailure: error => ({
    type: Types.POST_GYM_ACTIVTY_FAILURE,
    payload: {
      error,
    },
  }),
};
