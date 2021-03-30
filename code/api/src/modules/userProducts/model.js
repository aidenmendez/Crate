'use strict'

//userProduct
module.exports = function(sequelize, DataTypes) {
  let UserProduct = sequelize.define('userProducts', {
    kept: {
      type: DataTypes.BOOLEAN
    },
    userId: {
      type: DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER
    }
  })

  UserProduct.associate = function(models) {
    UserProduct.belongsTo(models.User)
    UserProduct.belongsTo(models.Product)
  }

  return UserProduct
}