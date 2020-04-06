import HomeActionTypes from "./types";

export const initialState = {
  isLoaded: false,
};

export default (state = initialState, action: any) => {
  const { TOGGLE_LOADED } = HomeActionTypes;
  switch (action.type) {
    case TOGGLE_LOADED:
      return {
        ...state,
        isLoaded: true,
      };
    default:
      return state;
  }
};
