import HomeActionTypes from "./types";

export const loadPage = () => ({
  type: HomeActionTypes.TOGGLE_LOADED,
});

export const fetchUserIfNeeded = () => (dispatch: any, getState: any) => {
  return dispatch({ isLoading: false });
};
