// Imports

// App Imports
import {
  PRODUCTS_GET_LIST_REQUEST,
  PRODUCTS_GET_LIST_RESPONSE,
  PRODUCTS_GET_LIST_FAILURE,
  PRODUCTS_GET_LIST_RESET,
  PRODUCTS_GET_REQUEST,
  PRODUCTS_GET_RESPONSE,
  PRODUCTS_GET_FAILURE,
  PRODUCTS_GET_RELATED_LIST_REQUEST,
  PRODUCTS_GET_RELATED_LIST_RESPONSE,
  PRODUCTS_GET_RELATED_LIST_FAILURE
} from './actions'

// Product list

// Initial State
// set the initial state so the app can load
const productsInitialState = {
  isLoading: false,
  error: null,
  list: []
}

// State
export const products = (state = productsInitialState, action) => {
  switch (action.type) {
    // if PRODUCTS_GET_LIST_REQUEST is passed in as the action,
    // return state, updating isLoading and error
    case PRODUCTS_GET_LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null,
      }
    // if PRODUCTS_GET_LIST_RESPONSE is passed in as the action,
    // return state, updating isLoading, error, and list
    case PRODUCTS_GET_LIST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: action.list,
      }
    // if PRODUCTS_GET_LIST_FAILURE is passed in as the action,
    // return state, updating isLoading and error
    case PRODUCTS_GET_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    // if PRODUCTS_GET_LIST_RESET is passed in as the action,
    // reset and return state
    case PRODUCTS_GET_LIST_RESET:
      return Object.assign({}, productsInitialState)
    // if none of those were passed in, just return state
    default:
      return state
  }
}


// Single product

// Initial State
// set the initial state so the app can load
const productInitialState = {
  isLoading: false,
  error: null,
  item: {}
}

// State
export const product = (state = productInitialState, action) => {
  switch (action.type) {
    // if PRODUCTS_GET_REQUEST is passed in as the action,
    // return state, updating isLoading and error
    case PRODUCTS_GET_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null,
      }
    // if PRODUCTS_GET_RESPONSE is passed in as the action,
    // return state, updating isLoading, error, and item
    case PRODUCTS_GET_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        item: action.item,
      }
    // if PRODUCTS_GET_FAILURE is passed in as the action,
    // return state, updating isLoading and error
    case PRODUCTS_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    // if none of those were passed in, just return state
    default:
      return state
  }
}


// Product Related list

// Initial State
// set the initial state so the app can load
const productsRelatedInitialState = {
  isLoading: false,
  error: null,
  list: [],
  productId: 0
}

// State
export const productsRelated = (state = productsRelatedInitialState, action) => {
  switch (action.type) {
    // if PRODUCTS_GET_RELATED_LIST_REQUEST is passed in as the action,
    // return state, updating isLoading and error
    case PRODUCTS_GET_RELATED_LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null,
      }
    // if PRODUCTS_GET_RELATED_LIST_RESPONSE is passed in as the action,
    // return state, updating isLoading, error, list, and productID
    case PRODUCTS_GET_RELATED_LIST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: action.list,
        productId: action.productId,
      }
    // if PRODUCTS_GET_RELATED_LIST_FAILURE is passed in as the action,
    // return state, updating isLoading and error
    case PRODUCTS_GET_RELATED_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    // if none of those were passed in, just return state
    default:
      return state
  }
}

