"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Company.belongsTo(models.CompanyStatus, {
        foreignKey: "statusId",
        as: "status",
      });
      Company.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "categoryy",
      });

      Company.belongsTo(models.SubCategory, {
        foreignKey: "subCategoryId",
        as: "sub_category",
      });
      Company.belongsTo(models.Roc, {
        foreignKey: "rocId",
        // as: 'roc'
      });

      Company.belongsTo(models.CompanyClass, {
        foreignKey: "classId",
        as: "class",
      });
    }
  }
  Company.init(
    {
      name: DataTypes.STRING,
      cin: DataTypes.STRING,
      email: DataTypes.STRING(255),
      classId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      subCategoryId: DataTypes.INTEGER,
      rocId: DataTypes.INTEGER,
      statusId: DataTypes.INTEGER,
      activity: DataTypes.STRING,
      registrationDate: DataTypes.DATE,
      authorisedCapital: DataTypes.BIGINT,
      paidUpCapital: DataTypes.BIGINT,
      pin: DataTypes.BIGINT,
      country: DataTypes.STRING(60),
      address: DataTypes.STRING,
      state: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Company",
      tableName: "companies",
      freezeTableName: true,
    }
  );
  return Company;
};
