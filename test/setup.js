process.env.DATABASE_URL =
  'postgres://postgres:postgres@localhost:5432/lehman_college_dev'

const { connectionParams } = require('./../db')
const knex = require('knex')({ client: 'pg', connection: connectionParams })

async function runMigrations() {
  await knex.migrate.latest({ directory: './migrations' })
}

module.exports = runMigrations
