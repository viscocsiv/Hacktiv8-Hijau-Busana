'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Profile);
      User.belongsToMany(models.Product, { through: 'UserHasProduct'});
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please input Email!"
        },
        notEmpty: {
          args: true,
          msg: "Please input Email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please input Password!"
        },
        notEmpty: {
          args: true,
          msg: "Please input Password"
        }
      }
    },
    role: DataTypes.STRING,
    ProfileId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  User.addHook('beforeCreate', (user, options) => {
    user.role = 'User'
  });
  User.addHook('beforeUpdate', (user, options) => {
    user.role = 'User'
  });
  return User;
};