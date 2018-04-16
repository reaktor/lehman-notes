process.env.DB_USER = 'postgres'
process.env.DB_PWD = 'postgres'
process.env.DB_NAME = 'lehman_college_dev_test'
process.env.DB_HOST = 'localhost'
process.env.DB_PORT = 5432

const { connectionParams } = require('./../db')
const knex = require('knex')({ client: 'pg', connection: connectionParams })

async function runMigrations() {
  await knex.migrate.latest({ directory: './migrations' })
}

module.exports = runMigrations
