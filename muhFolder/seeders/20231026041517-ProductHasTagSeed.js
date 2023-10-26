'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let productHasTags = fs.readFileSync('./data/productHasTag.json', "utf-8")
    productHasTags = JSON.parse(productHasTags)
    productHasTags.forEach(productHasTag => {
      delete productHasTag.id,
        productHasTag.createdAt = new Date(),
        productHasTag.updatedAt = new Date()
      return productHasTag
    });

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("ProductHasTags", productHasTags)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("ProductHasTags", null, {})
  }
};
