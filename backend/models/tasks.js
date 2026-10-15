'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tasks.belongsTo(models.Users, {
        foreignKey: "userId", 
        as: "user"
      })
    }
  }
  Tasks.init({
    userId: DataTypes.INTEGER,
    titulo: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};