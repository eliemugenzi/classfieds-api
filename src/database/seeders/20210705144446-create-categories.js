'use strict';
const moment = require('moment');

const created_at = moment().format();
const updated_at = created_at;

const data = [
  {
    name: 'Fashion',
    description: 'Fashion products',
    created_at,
    updated_at,
  },
  {
    name: 'Electronics',
    description: 'Electronics products',
    created_at,
    updated_at,
  },
  {
    name: 'Health & Beauty',
    description: 'Health and beauty',
    created_at,
    updated_at,
  },
  {
    name: 'Sports',
    description: 'Sports products',
    created_at,
    updated_at,
  },
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('categories', data, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    return queryInterface.bulkDelete('categories', null, {});
  },
};
