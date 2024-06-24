"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("companies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      catgeoryId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      },
      subCategoryId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'sub_categories',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      rocId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'roc',
          key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      },
      activity: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      registrationDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      classId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'company_class',
          key: 'id'
        }
      },
      statusId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'company_status',
          key: 'id'
        }
      },
      authorisedCapital: {
        type: Sequelize.BIGINT,
      },
      paidUpCapital:{
        type: Sequelize.BIGINT
      },
      pin: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      country: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("companies");
  },
};
