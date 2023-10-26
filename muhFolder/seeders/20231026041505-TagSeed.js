'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let tags = fs.readFileSync('./data/tags.json', "utf-8")
    tags = JSON.parse(tags)
    tags.forEach(tag => {
      delete tag.id,
        tag.createdAt = new Date(),
        tag.updatedAt = new Date()
      return tag
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
    await queryInterface.bulkInsert("Tags", tags)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Tags", null, {})
  }
};
