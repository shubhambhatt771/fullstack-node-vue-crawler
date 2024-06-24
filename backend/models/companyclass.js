'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CompanyClass.hasMany(models.Company,{
        foreignKey: 'classId'
      });
    }
  }
  CompanyClass.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CompanyClass',
    tableName: 'company_class',
    freezeTableName: true
  });
  return CompanyClass;
};