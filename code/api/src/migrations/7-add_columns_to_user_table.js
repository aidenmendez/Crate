'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn('users', 'description', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('users', 'address_line_1', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('users', 'address_line_2', {
        type: Sequelize.STRING
      }), 
      queryInterface.addColumn('users', 'city', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('users', 'state', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('users', 'zipcode', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('users', 'image', {
        type: Sequelize.STRING
      })
    ]  
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Users', 'description'),
    queryInterface.removeColumn('Users', 'address_line_1'),
    queryInterface.removeColumn('Users', 'address_line_2'),
    queryInterface.removeColumn('Users', 'city'),
    queryInterface.removeColumn('Users', 'state'),
    queryInterface.removeColumn('Users', 'zipcode'),
    queryInterface.removeColumn('Users', 'image')
  }
};
 // description, address_line_1, address_line_2, city, state, zipcode, image