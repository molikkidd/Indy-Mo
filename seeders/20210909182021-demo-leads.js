'use strict';

const faker = require('faker');
const seedArray = [];
for (let i = 0; i < 10; i++) {
  // create data object
    const newObject = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        phoneNumber: faker.phone.phoneNumberFormat(),
        address: faker.address.streetAddress(),
        state: faker.address.stateAbbr(),
        zipCode: parseInt(faker.address.zipCode()),
        email: faker.internet.email(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
    // send data objects to seedArray
    seedArray.push(newObject);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Leads', seedArray, {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Leads', null, {});

    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
