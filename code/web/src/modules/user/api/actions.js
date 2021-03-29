// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'
import cookie from 'js-cookie'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const LOGIN_REQUEST = 'AUTH/LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'AUTH/LOGIN_RESPONSE'
export const SET_USER = 'AUTH/SET_USER'
export const LOGOUT = 'AUTH/LOGOUT'

// Actions

// Set a user after login or using localStorage token
// if the user has already logged in and/or their token was saved in localStorage,
// call the SET_USER reducer
export function setUser(token, user) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }

  return { type: SET_USER, user }
}

// Login a user using credentials
// if the user is logging in now, 
// call the LOGIN_REQUEST reducer
export function login(userCredentials, isLoading = true) {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      isLoading
    })
    // which makes a query to the API asking for 
    // the user name, email, role, and token
    return axios.post(routeApi, query({
      operation: 'userLogin',
      variables: userCredentials,
      fields: ['user {name, email, role}', 'token']
    }))
      .then(response => {
        let error = ''
        // if the response has an error, get it
        if (response.data.errors && response.data.errors.length > 0) {
          error = response.data.errors[0].message
          // otherwise this is how you find the user and token from the response object
        } else if (response.data.data.userLogin.token !== '') {
          const token = response.data.data.userLogin.token
          const user = response.data.data.userLogin.user
          // dispatch sends out the bat signal so the reducers fire
          // have to call it from here because otherwise all you can access is the promise
          // instead of the response object
          dispatch(setUser(token, user))

          loginSetUserLocalStorageAndCookie(token, user)
        }
        // also fire the LOGIN_RESPONSE reducer, sending that error through if there was one
        dispatch({
          type: LOGIN_RESPONSE,
          error
        })
      })
      .catch(error => {
        // if you catch an error from the API,
        // fire the LOGIN_RESPONSE reducer with this error message
        dispatch({
          type: LOGIN_RESPONSE,
          error: 'Please try again'
        })
      })
  }
}

// Set user token and info in localStorage and cookie
// so the user stays logged in even if they refresh the page
export function loginSetUserLocalStorageAndCookie(token, user) {
  // Update token
  window.localStorage.setItem('token', token)
  window.localStorage.setItem('user', JSON.stringify(user))

  // Set cookie for SSR
  cookie.set('auth', { token, user }, { path: '/' })
}

// Register a user
// makes a mutation call to the API when a new user signs up
// sending through their id, name, and email address
export function register(userDetails) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'userSignup',
      variables: userDetails,
      fields: ['id', 'name', 'email']
    }))
  }
}

// Log out user and remove token from localStorage
// fires the LOGOUT reducer and clears the user's token, etc from localStorage
export function logout() {
  return dispatch => {
    logoutUnsetUserLocalStorageAndCookie()

    dispatch({
      type: LOGOUT
    })
  }
}

// Unset user token and info in localStorage and cookie
export function logoutUnsetUserLocalStorageAndCookie() {
  // Remove token
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('user')

  // Remove cookie
  cookie.remove('auth')
}

// Get user gender
// I suppose this is necessary
// so we know which clothes to show the user
// makes a query to the API for the current user's id and name and gender
export function getGenders() {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'userGenders',
      fields: ['id', 'name']
    }))
  }
}
