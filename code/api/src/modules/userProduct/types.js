import { GraphQLObjectType, GraphQLBoolean, GraphQLInt } from 'graphql'
import UserType from '../user/types'
import ProductType from '../product/types'

// UserProduct type
const UserProductType = new GraphQLObjectType({
  name: 'userProduct',
  description: 'User Product Type',

  fields: ()=> ({
    id: { type: GraphQLInt },
    user: { type: UserType },
    product: { type: ProductType },
    kept: { type: GraphQLBoolean }
  })
})

export default UserProductType