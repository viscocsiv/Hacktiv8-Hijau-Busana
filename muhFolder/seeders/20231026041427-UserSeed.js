'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let users = fs.readFileSync('./data/users.json', "utf-8")
    users = JSON.parse(users)
    users.forEach(user => {
      delete user.id,
        user.createdAt = new Date(),
        user.updatedAt = new Date()
      return user
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
    await queryInterface.bulkInsert("Users", users)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {})
  }
};
