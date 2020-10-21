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
        "room_type": "Single Bed",
        "available": 10,
        "price": 100000
      },
      {
        "room_type": "Bouble Bed",
        "available": 1,
        "price": 200000
      },
      {
        "room_type": "Single Bed - Kolam renang",
        "available": 10,
        "price": 100000
      },
      {
        "room_type": "Double Bed - Kolam renang",
        "available": 10,
        "price": 100000
      }
    ]

    data.forEach(element => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('Rooms', data)
},

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Rooms', null)
  }
};
