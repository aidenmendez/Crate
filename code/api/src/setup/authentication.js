// User authentication

// Gets access to JSON web Token
// Imports
import jwt from 'jsonwebtoken'

// Imports from server.json to get access to secret (crate api key)
import serverConfig from '../config/server.json'

// Authentication middleware
export default function (request, response, next) {
  // sets variable 'authToken' to authorization header in the request
  let authToken = request.headers.authorization

  // checks if authtoken was provided and is not nil
  if (authToken && authToken !== null) {
    // Try statements are used to define a block of code that checks for erros
    try {
      const token = authToken.split(' ')
      // secret expects the first element of token
      request.user = jwt.verify(token[1], serverConfig.secret)
      // Catch statements are used to define a block of code that will be executed IF there is an error in the try block
    } catch (e) {
      console.warn('Invalid token detected.')
    }
  } else {
    // creates an object with no properties
    // not sure what the output would look like for the user
    request.user = {}
  }

  // The next() method returns an object with two properties done and value.
  // You can also provide a parameter to the next method to send a value to the generator.
  next()
}
