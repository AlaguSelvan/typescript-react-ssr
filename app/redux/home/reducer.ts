import HomeActionTypes from './types';

export const initialState = {
  isLoaded: false,
  userData: []
};

export default (state = initialState, action: any) => {
  const { FETCH_USERS_DATA } = HomeActionTypes;
  switch (action.type) {
    case FETCH_USERS_DATA:
      return {
        ...state,
        userData: action.payload
      };
    default:
      return state;
  }
};
