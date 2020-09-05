'use strict'

export function up(queryInterface, Sequelize) {
  return queryInterface.createTable('boards', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    user_votes: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    limit_votes: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    in_voting: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false
    }
  })
}
export function down(queryInterface, Sequelize) {
  return queryInterface.dropTable('boards')
}
