'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Accounts.belongsTo(models.Users,{
        foreignKey: "userId", 
        as: "user"
      })
    }
  }
  Accounts.init({
    userId: DataTypes.INTEGER,
    provider: DataTypes.STRING,
    providerAccountId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Accounts',
  });
  return Accounts;
};