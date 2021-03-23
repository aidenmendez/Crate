// Creates the schema

// Imports
import { GraphQLSchema } from 'graphql'

// Imports the query using relative path syntax
// 'query' variable is set in the queries.js file
// Same for mutation

// App Imports
import query from './queries'
import mutation from './mutations'

// Sets constant 'schema' using variables from both files above
// Schema
const schema = new GraphQLSchema({
  query,
  mutation
})

// Makes this available for other files to import
// Maybe similar to environment variables?
export default schema
