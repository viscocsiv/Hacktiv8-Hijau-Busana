'use strict';
const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let userHasProducts = fs.readFileSync('./data/userHasProducts.json', "utf-8")
    userHasProducts = JSON.parse(userHasProducts)
    userHasProducts.forEach(el => {
      el.createdAt = new Date(),
      el.updatedAt = new Date()
      return el
    });
    await queryInterface.bulkInsert("UserHasProducts", userHasProducts)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserHasProducts", null, {})
  }
};