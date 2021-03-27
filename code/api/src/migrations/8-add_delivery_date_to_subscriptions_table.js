'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('subscriptions', 'deliveryDate', {
      type: Sequelize.STRING
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('subscriptions', 'description')
  }
};
