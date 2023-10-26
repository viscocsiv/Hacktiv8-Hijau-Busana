'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let products = fs.readFileSync('./data/products.json', "utf-8")
    products = JSON.parse(products)
    products.forEach(product => {
      product.createdAt = new Date(),
      product.updatedAt = new Date()
      return product
    });
    await queryInterface.bulkInsert("Products", products)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {})
  }
};