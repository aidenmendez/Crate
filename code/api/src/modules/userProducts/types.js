import { GraphQLObjectType, GraphQLBoolean, GraphQLInt } from 'graphql'
import UserType from '../user/types'
import ProductType from '../product/types'

const UserProductType = new GraphQLObjectType({
  name: 'userProduct',
  description: 'User Product type',

  fields: ()=> ({
    id: { type: GraphQLInt },
    user: { type: UserType },
    product: { type: ProductType },
    kept: { type: GraphQLBoolean }
  })
})

export default UserProductType