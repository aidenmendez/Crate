import { GraphQLList } from 'graphql'

// App Imports
import UserProductType from './types'
import { getAll, getByUser } from './resolvers'

// Get all userProducts
export const userProducts = {
  type: new GraphQLList(UserProductType),
  resolve: getAll
}

// Get userProducts by User
export const userProductsByUser = {
  type: new GraphQLList(UserProductType),
  resolve: getByUser
}