import HomeActionTypes from './types';
import axios from 'axios';

export const fetchUserData = () => async (dispatch: any) => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  dispatch({
    type: HomeActionTypes.FETCH_USERS_DATA,
    payload: data
  });
};

export const fetchUserIfNeeded = () => (dispatch: any) => {
  return dispatch({ isLoading: false });
};
