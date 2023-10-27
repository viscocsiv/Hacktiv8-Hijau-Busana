'use strict';
const { Op } = require('sequelize');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category);
      Product.belongsToMany(models.User, { through: 'UserHasProduct' });
    }

    get formatDate() {
      return this.updatedAt.toLocaleDateString("en-CA");
    }

    static getAllProductsAvailable(sortBy) {
      const sort = {
        attributes: ['name', 'id', 'imgUrl', 'description', 'price', 'stock'],
        where: {
          stock: {
            [Op.gt]: 0
          }
        },
        order: [['id', 'ASC']]
      }

      if (sortBy) sort.order = [
        ['price', 'ASC']
      ];

      const products = Product.findAll(sort);
      return products;
    }
  }
  Product.init({
    name: DataTypes.STRING,
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please input Stock"
        },
        notEmpty: {
          args: true,
          msg: "Please input Stock"
        },
        isNumeric: {
          args: true,
          msg: "Please input type number to Stock"
        }
      }
    },

    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    imgUrl: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};