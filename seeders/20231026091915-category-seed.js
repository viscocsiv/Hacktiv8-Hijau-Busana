'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let categories = fs.readFileSync('./data/categories.json', "utf-8")
    categories = JSON.parse(categories)
    categories.forEach(category => {
      category.createdAt = new Date(),
      category.updatedAt = new Date()
      return category
    });
    await queryInterface.bulkInsert("Categories", categories)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
  }
};