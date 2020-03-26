import HomeActionTypes from './home.types'

const INITIAL_STATE = {
  isLoaded: false
}

export default (state = INITIAL_STATE, action: any): any => {
  const { TOGGLE_LOADED } = HomeActionTypes;
  switch(action.type) {
    case TOGGLE_LOADED:
      return {
        ...state,
        isLoaded: true
      }
  }
}
