// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Knex = require('knex')

/**
 *
 * @param {Knex} knex
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.timestamp('createdAt')
    table.text('email').unique()
    table.string('hash')
    table.string('salt')
  })
}

/**
 *
 * @param {Knex} knex
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
