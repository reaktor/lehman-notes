process.env.DATABASE_URL =
  'postgres://postgres:postgres@localhost:5432/lehman_college_dev'

const { connectionParams } = require('./../db')
const knex = require('knex')({ client: 'pg', connection: connectionParams })

async function rollback() {
  await knex.migrate.rollback({ directory: './migrations' })
}

module.exports = rollback
