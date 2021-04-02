'use strict';

const params = require('../config/params');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('userProducts', [
      {
        id: 1,
        userId: 2,
        productId: 2,
        kept: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 2,
        productId: 4,
        kept: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId: 2,
        productId: 7,
        kept: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        userId: 2,
        productId: 8,
        kept: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        userId: 2,
        productId: 3,
        kept: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  }
}