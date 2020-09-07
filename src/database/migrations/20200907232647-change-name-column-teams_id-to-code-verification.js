'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn('users', 'teams_ids', 'code_verification');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('cards', 'code_verification');
  },
};
