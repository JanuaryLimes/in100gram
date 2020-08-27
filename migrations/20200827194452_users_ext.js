// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Knex = require('knex')

/**
 *
 * @param {Knex} knex
 */
exports.up = async function (knex) {
  await knex.schema.dropTable('users').then()
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary()
    table.bigInteger('createdAt').unsigned()
    table.text('email').unique()
    table.string('hash')
    table.string('salt')
    table.string('photoUrl')
    table.string('displayName')
  })
}

/**
 *
 * @param {Knex} knex
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
