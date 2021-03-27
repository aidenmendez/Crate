'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('users', 'description', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('users', 'addressLine1', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('users', 'addressLine2', {
        type: Sequelize.STRING
      }), 
      queryInterface.addColumn('users', 'city', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('users', 'state', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('users', 'zipcode', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('users', 'image', {
        type: Sequelize.STRING
      })
    ] 
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'description'),
    queryInterface.removeColumn('users', 'address_line_1'),
    queryInterface.removeColumn('users', 'address_line_2'),
    queryInterface.removeColumn('users', 'city'),
    queryInterface.removeColumn('users', 'state'),
    queryInterface.removeColumn('users', 'zipcode'),
    queryInterface.removeColumn('users', 'image')
  }
};
 // description, address_line_1, address_line_2, city, state, zipcode, image