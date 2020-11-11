// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Knex = require('knex')

/**
 *
 * @param {Knex} knex
 */
exports.up = async function (knex) {
  return knex.schema.createTable('followers', (table) => {
    table.uuid('userId').references('id').inTable('users').onDelete('CASCADE')
    table.uuid('follow').references('id').inTable('users').onDelete('CASCADE')
    table.primary(['userId', 'follow'])
  })
}

/**
 *
 * @param {Knex} knex
 */
exports.down = function (knex) {
  return knex.schema.dropTable('followers')
}
