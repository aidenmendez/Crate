'use strict'

// User
module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('users', {
    // add new attributes to user: 
    // description (string), image (string), addressLine1 (string), addressLine2 (string), city (string), state (string), zipcode (int)
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
    }
  })

  User.associate = function(models) {
    User.hasMany(models.Subscription)
  }

  return User
}