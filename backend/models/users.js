'use strict';
const bcrypt = require("bcrypt")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Tasks, {
        foreignKey: 'userId',
        as: 'task'
      })
      Users.hasMany(models.Accounts, {
        foreignKey: 'userId',
        as: 'Account'
      })
    }
  }
  Users.init({
    name: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  Users.beforeCreate(async (User, options) => {
    if(User.password){
      const salt = await bcrypt.genSalt(10, 'a');
      User.password = await bcrypt.hash(User.password, salt);
    }
  });
  Users.beforeUpdate(async (user, options) => {
    if(user.changed('password')){
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });
  return Users;
};