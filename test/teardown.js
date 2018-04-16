process.env.DB_USER = 'postgres'
process.env.DB_PWD = 'postgres'
process.env.DB_NAME = 'lehman_college_test'
process.env.DB_HOST = 'localhost'
process.env.DB_PORT = 5432

const { connectionParams } = require('./../db')
const knex = require('knex')({ client: 'pg', connection: connectionParams })

async function rollback() {
  await knex.migrate.rollback({ directory: './migrations' })
}

module.exports = rollback
