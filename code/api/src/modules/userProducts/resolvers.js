import models from '../../setup/models'

// get all userProducts
export async function getall() {
  return await models.userProduct.findAll({
    include: [
      { model: models.User, as: 'user' },
      { model: models.Product, as: 'product' }
    ]
  })
}

// get all userProducts by user
export async function getByUser(parentValue, {}, { auth }) {
  if(auth.user && auth.user.id > 0) {
    return await models.UserProduct.findAll({
      where: {
        userId: auth.user.id
      },
      include: [
        { model: models.User, as: 'user' },
        { model: models.Product, as: 'product' }
      ]
    })
  }
}