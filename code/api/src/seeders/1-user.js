'use strict';

const bcrypt = require('bcrypt');
const config = require('../config/server.json');
const params = require('../config/params.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'The Admin',
        email: 'admin@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.admin,
        createdAt: new Date(),
        updatedAt: new Date()
        // Add newly created attributes:
          // description (string), image (string), addressLine1 (string), addressLine2 (string), city (string), state (string), zipcode (int)
      },
      {
        name: 'The User',
        email: 'user@crate.com',
        password: bcrypt.hashSync('123456', config.saltRounds),
        role: params.user.roles.user,
        createdAt: new Date(),
        updatedAt: new Date()
        // Add newly created attributes
          // description (string), image (string), addressLine1 (string), addressLine2 (string), city (string), state (string), zipcode (int)
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
}
