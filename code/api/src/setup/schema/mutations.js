// Imports
import { GraphQLObjectType } from 'graphql'

// Imports all mutations (which I think act like migrations) for user, product, subscription and crate models
// Looks like SQL, i.e import all from table user from the mutation file for this model

// App Imports
import * as user from '../../modules/user/mutations'
import * as product from '../../modules/product/mutations'
import * as crate from '../../modules/crate/mutations'
import * as subscription from '../../modules/subscription/mutations'

// Defines 'mutation' constant as a GraphQL Object
// Mutation
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: 'API Mutations [Create, Update, Delete]',

  fields: {
    ...user,
    ...product,
    ...crate,
    ...subscription
  }
})

// Gives access to schema
export default mutation
