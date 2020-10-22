'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = [
      {
        "first_name": "admin",
        "last_name": "john",
        "password": "admin",
        "no_hp": "08123456789",
        "email": "admin@gmail.com",
        "role": "admin"
      }
    ]

    data.forEach(elemenet => {
      elemenet.createdAt = new Date()
      elemenet.updatedAt= new Date()
    })

    return queryInterface.bulkInsert('Users', data)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkInsert('Users', null)
  }
};
