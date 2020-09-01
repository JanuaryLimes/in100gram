// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Knex = require('knex')

/**
 *
 * @param {Knex} knex
 */
exports.up = async function (knex) {
  if (await knex.schema.hasTable('users')) {
    await knex.schema.dropTable('users').then()
  }
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().notNullable()
    table.bigInteger('createdAt').unsigned().notNullable()
    table.text('email').unique().notNullable()
    table.string('hash').notNullable()
    table.string('salt').notNullable()
    table.string('photoUrl')
    table.string('displayName').unique().notNullable()
  })
}

/**
 *
 * @param {Knex} knex
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
