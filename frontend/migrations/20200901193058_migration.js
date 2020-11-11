// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Knex = require('knex')

/**
 *
 * @param {Knex} knex
 */
exports.up = async function (knex) {
  return knex.schema
    .createTable('posts', (table) => {
      table.uuid('id').primary().notNullable()
      table.dateTime('createdAt', { useTz: false }).notNullable()
      table.string('contentUrl').notNullable()

      table
        .uuid('authorId')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
    })
    .createTable('postUserLikes', (table) => {
      table.uuid('postId').references('id').inTable('posts').onDelete('CASCADE')
      table.uuid('userId').references('id').inTable('users').onDelete('CASCADE')
      table.primary(['postId', 'userId'])
    })
    .createTable('comments', (table) => {
      table.uuid('id').primary().notNullable()
      table.uuid('postId').references('id').inTable('posts').onDelete('CASCADE')
      table
        .uuid('authorId')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      table.dateTime('createdAt', { useTz: false }).notNullable()
      table.string('text').notNullable()
    })
}

/**
 *
 * @param {Knex} knex
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable('posts')
    .dropTable('postUserLikes')
    .dropTable('comments')
}
