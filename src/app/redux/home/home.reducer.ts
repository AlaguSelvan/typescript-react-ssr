import HomeActionTypes from './home.types'
// import {} from './'

const INITIAL_STATE = {
  isLoaded: false
}

const homeReducer = (state = INITIAL_STATE, action: any) => {
  const { TOGGLE_LOADED } = HomeActionTypes;
  switch(action.type) {
    case TOGGLE_LOADED:
      return {
        ...state,
        isLoaded: true
      }
  }
}

export default homeReducer