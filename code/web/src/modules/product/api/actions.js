// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const PRODUCTS_GET_LIST_REQUEST = 'PRODUCTS/GET_LIST_REQUEST'
export const PRODUCTS_GET_LIST_RESPONSE = 'PRODUCTS/GET_LIST_RESPONSE'
export const PRODUCTS_GET_LIST_FAILURE = 'PRODUCTS/GET_LIST_FAILURE'
export const PRODUCTS_GET_LIST_RESET = 'PRODUCTS/GET_LIST_RESET'
export const PRODUCTS_GET_REQUEST = 'PRODUCTS/GET_REQUEST'
export const PRODUCTS_GET_RESPONSE = 'PRODUCTS/GET_RESPONSE'
export const PRODUCTS_GET_FAILURE = 'PRODUCTS/GET_FAILURE'
export const PRODUCTS_GET_RELATED_LIST_REQUEST = 'PRODUCTS/GET_RELATED_LIST_REQUEST'
export const PRODUCTS_GET_RELATED_LIST_RESPONSE = 'PRODUCTS/GET_RELATED_LIST_RESPONSE'
export const PRODUCTS_GET_RELATED_LIST_FAILURE = 'PRODUCTS/GET_RELATED_LIST_FAILURE'

// Actions

// Get list of products
// if getList is called, call the PRODUCTS_GET_LIST_REQUEST reducer
export function getList(isLoading = true, forceRefresh = false) {
  return dispatch => {
    dispatch({
      type: PRODUCTS_GET_LIST_REQUEST,
      error: null,
      isLoading
    })
    // which makes a query to the API asking for
    // the fields listed, related to this product
    return axios.post(routeApi, query({
      operation: 'products',
      fields: ['id', 'name', 'slug', 'description', 'image', 'createdAt', 'updatedAt']
    }))
      .then(response => {
        // if the status is ok, call the PRODUCTS_GET_LIST_RESPONSE reducer
        if (response.status === 200) {
          dispatch({
            type: PRODUCTS_GET_LIST_RESPONSE,
            error: null,
            isLoading: false,
            list: response.data.data.products,
          })
          // otherwise call the PRODUCTS_GET_LIST_FAILURE reducer
        } else {
          dispatch({
            type: PRODUCTS_GET_LIST_FAILURE,
            error: "Some error occurred. Please try again.",
            isLoading: false,
          })
        }
      })
      .catch(error => {
        // if you catch an error, call the PRODUCTS_GET_LIST_FAILURE
        dispatch({
          type: PRODUCTS_GET_LIST_FAILURE,
          error: "Some error occurred. Please try again.",
          isLoading: false,
        })
      })
  }
}

// Get single product
export function get(slug, isLoading = true) {
  // if get is called, call the PRODUCTS_GET_REQUEST reducer
  return (dispatch) => {
    dispatch({
      type: PRODUCTS_GET_REQUEST,
      isLoading,
    })
    // which makes a query to the API asking for that product's information
    return (
      axios
        .post(
          routeApi,
          query({
            operation: "product",
            variables: { slug },
            fields: ["id", "name", "slug", "description", "image", "createdAt"],
          })
        )
        .then((response) => {
          // if the status is ok, call the PRODUCTS_GET_LIST_RESPONSE reducer
          if (response.status === 200) {
            // if there's an error in the response
            if (response.data.errors && response.data.errors.length > 0) {
              // also call the PRODUCTS_GET_FAILURE reducer
              dispatch({
                type: PRODUCTS_GET_FAILURE,
                error: response.data.errors[0].message,
                isLoading: false,
              })
            } else {
              // otherwise just call the PRODUCTS_GET_RESPONSE reducer
              dispatch({
                type: PRODUCTS_GET_RESPONSE,
                error: null,
                isLoading: false,
                item: response.data.data.product,
              })
            }
          } else {
            // if the response status was not ok, call the PRODUCTS_GET_FAILURE reducer
            dispatch({
              type: PRODUCTS_GET_FAILURE,
              error: "Some error occurred. Please try again.",
              isLoading: false,
            })
          }
        })
        .catch((error) => {
          // if you catch an error, call the PRODUCTS_GET_FAILURE reducer
          dispatch({
            type: PRODUCTS_GET_FAILURE,
            error: error,
            isLoading: false,
          })
        })
    )
  }
}

// Get single product by Id
// if getByID is called, make an API query to get that product's fields
export function getById(productId) {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'productById',
      variables: { productId },
      fields: ['id', 'name', 'slug', 'description', 'image', 'type', 'gender']
    }))
  }
}

// Get list of products related to a product
// if getRelatedList is called, make an API query to get the products
// that are related to that product
export function getRelatedList(productId, isLoading = true) {
  return (dispatch, getState) => {
    let state = getState()
    // if there are no related products and the product you're looking at 
    // is different from the one in state
    if (state.productsRelated.list.length === 0 || state.productId !== productId) {
      // call the PRODUCTS_GET_RELATED_LIST_REQUEST reducer
      dispatch({
        type: PRODUCTS_GET_RELATED_LIST_REQUEST,
        error: null,
        isLoading,
      })
      // make a query to the API for related products/details
      return axios
        .post(
          routeApi,
          query({
            operation: "productsRelated",
            variables: { productId },
            fields: ["id", "name", "slug", "description", "image"],
          })
        )
        .then((response) => {
          // if the status is ok, call the PRODUCTS_GET_RELATED_LIST_RESPONSE reducer
          if (response.status === 200) {
            dispatch({
              type: PRODUCTS_GET_RELATED_LIST_RESPONSE,
              error: null,
              isLoading: false,
              list: response.data.data.productsRelated,
              productId,
            })
          } else {
            // otherwise call the PRODUCTS_GET_RELATED_LIST_FAILURE reducer
            dispatch({
              type: PRODUCTS_GET_RELATED_LIST_FAILURE,
              error: "Some error occurred. Please try again.",
              isLoading: false,
            })
          }
        })
        .catch((error) => {
          // if you catch an error, call the PRODUCTS_GET_RELATED_LIST_FAILURE reducer
          dispatch({
            type: PRODUCTS_GET_RELATED_LIST_FAILURE,
            error: "Some error occurred. Please try again.",
            isLoading: false,
          })
        })
    }
  }
}

// Create or update product
// if createOrUpdate is called and a product is passed through,
// return the updated product or delete that product id and create a new product
export function createOrUpdate(product) {
  if (product.id > 0) {
    return update(product)
  } else {
    delete product.id
    return create(product)
  }
}

// Create product
// if create is called and a product is passed through, 
// make a mutation request to the API with that product's information
export function create(product) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'productCreate',
      variables: product,
      fields: ['id']
    }))
  }
}

// Update product
// if update is called and a product is passed through,
// make a mutation request to the API with that product's new information
export function update(product) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'productUpdate',
      variables: product,
      fields: ['id']
    }))
  }
}

// Remove product
// if remove is called and a product is passed through, 
// make a mutation call to the API to remove that product
// variables could be called product here and it would look much like update/create
export function remove(variables) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'productRemove',
      variables,
      fields: ['id']
    }))
  }
}

// Get product types
// if getTypes is called, make a query call to the API with the fields you want back
export function getTypes() {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'productTypes',
      fields: ['id', 'name']
    }))
  }
}
