// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import { UserType } from './types'
import { create, remove, update } from './resolvers'

// Create
export const userSignup = {
  type: UserType,
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },

    email: {
      name: 'email',
      type: GraphQLString
    },

    password: {
      name: 'password',
      type: GraphQLString
    }
  },
  resolve: create
}

// Remove
export const userRemove = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    }
  },
  resolve: remove
}

export const updateUser = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: GraphQLInt
    },
    name: {
      name: 'name',
      type: GraphQLString
    },
    email: {
      name: 'email',
      type: GraphQLString
    },
    description: {
      name: 'description',
      type: GraphQLString
    },
    addressLine1: {
      name: 'addressLine1',
      type: GraphQLString
    },
    addressLine2: {
      name: 'addressLine2',
      type: GraphQLString
    },
    city: {
      name: 'city',
      type: GraphQLString
    },
    state: {
      name: 'state',
      type: GraphQLString
    },
    zipcode: {
      name: 'zipcode',
      type: GraphQLInt
    },
    image: {
      name: 'image',
      type: GraphQLString
    }
  },
  resolve: update
}