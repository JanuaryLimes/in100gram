// Update with your config settings.

require('dotenv').config({ path: '.env' })

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL_DEV,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './seeds/dev',
    },
  },
  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL_TEST,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
