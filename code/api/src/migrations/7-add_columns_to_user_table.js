'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('users', 'description', {
        type: Sequelize.STRING
      });
      await queryInterface.addColumn('users', 'addressLine1', {
        type: Sequelize.STRING
      });
      await queryInterface.addColumn('users', 'addressLine2', {
        type: Sequelize.STRING
      });
      await queryInterface.addColumn('users', 'city', {
        type: Sequelize.STRING
      });
      await queryInterface.addColumn('users', 'state', {
        type: Sequelize.STRING
      });
      await queryInterface.addColumn('users', 'zipcode', {
        type: Sequelize.STRING
      });
      await queryInterface.addColumn('users', 'image', {
        type: Sequelize.STRING
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('users', 'description');
      await queryInterface.removeColumn('users', 'address_line_1');
      await queryInterface.removeColumn('users', 'address_line_2');
      await queryInterface.removeColumn('users', 'city');
      await queryInterface.removeColumn('users', 'state');
      await queryInterface.removeColumn('users', 'zipcode');
      await queryInterface.removeColumn('users', 'image');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};
