// App Imports
import { isEmpty } from '../../../setup/helpers'
import { SET_USER, LOGIN_REQUEST, LOGIN_RESPONSE, LOGOUT } from './actions'

// Initial State
// set the initial state so the app can load
export const userInitialState = {
  error: null,
  isLoading: false,
  isAuthenticated: false,
  details: null
}

// State
export default (state = userInitialState, action) => {
  switch (action.type) {
    // if SET_USER is passed in as the action,
    // return state, updating isAuthenticated and details
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        details: action.user,
      }
    // if LOGIN_REQUEST is passed in as the action,
    // return state, updating error and isLoading
    case LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isLoading: action.isLoading,
      }
    // if LOGIN_RESPONSE is passed in as the action,
    // return state, updating error and isLoading
    case LOGIN_RESPONSE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      }
    // if LOGOUT is passed in as the action,
    // return state, updating error, isLoading, isAuthenticated, and details
    case LOGOUT:
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
        details: null,
      }
    // if none of those were passed in, just return state
    default:
      return state
  }
}