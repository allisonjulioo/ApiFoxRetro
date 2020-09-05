'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.addColumn('boards', 'public', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('boards', 'public')
  }
}
