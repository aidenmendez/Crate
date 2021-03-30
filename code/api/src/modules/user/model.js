'use strict'

// User
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.TEXT
    },
    password: {
      type: DataTypes.TEXT
    },
    role: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
    },
    addressLine1: {
      type: DataTypes.TEXT
    },
    addressLine2: {
      type: DataTypes.TEXT
    },
    city: {
      type: DataTypes.TEXT
    },
    state: {
      type: DataTypes.TEXT
    },
    zipcode: {
      type: DataTypes.INTEGER
    },
    image: {
      type: DataTypes.TEXT
    },
    deliveryDate: {
      type: DataTypes.STRING
    }
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}
