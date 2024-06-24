'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CompanyStatus.hasMany(models.Company, {
        foreignKey: 'statusId',
      });
    }
  }
  CompanyStatus.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompanyStatus',
    tableName: 'company_status',
    freezeTableName: true
  });
  return CompanyStatus;
};