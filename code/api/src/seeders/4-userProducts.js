'use strict';

const params = require('../config/params');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('userProducts', [
      {
        id: 1,
        userId: 2,
        productId: 2,
        kept: false
      },
      {
        id: 2,
        userId: 2,
        productId: 4,
        kept: false
      },
      {
        id: 3,
        userId: 2,
        productId: 7,
        kept: true
      },
      {
        id: 4,
        userId: 2,
        productId: 8,
        kept: false
      },
      {
        id: 5,
        userId: 2,
        productId: 3,
        kept: true
      }
    ])
  }
}