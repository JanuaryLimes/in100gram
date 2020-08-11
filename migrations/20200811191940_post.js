exports.up = async function (knex) {
  if (!(await knex.schema.hasTable('post'))) {
    return knex.schema.createTable('post', function (table) {
      table.increments()
      table.string('title')
      table.text('description')
      table.dateTime('start_date')
      table.dateTime('due_date')
      table.timestamps()
    })
  }
}

exports.down = function (knex) {
  return knex.schema.dropTable('post')
}
