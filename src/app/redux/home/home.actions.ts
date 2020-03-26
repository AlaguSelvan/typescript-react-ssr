import HomeActionTypes from "./home.types";


export const loadPage = () => ({
  type: HomeActionTypes.TOGGLE_LOADED
})

const shouldFetchUser = (state: any, userId: string): boolean => {
  const userInfo = state.userInfo[userId];

  if (userInfo && userInfo.readyStatus === 'success') return false;

  return true;
};

export const fetchUserIfNeeded = () => (
  dispatch: any,
  getState: any
) => {
  return dispatch({ isLoading: false})
}
