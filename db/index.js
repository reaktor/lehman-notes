const { Pool } = require('pg')

const connectionString =
  process.env.DATABASE_URL ||
  `postgres://${process.env.DB_USER}:${process.env.DB_PWD}@${
    process.env.DB_HOST
  }:${process.env.DB_PORT}/${process.env.DB_NAME}`

const pool = new Pool({
  connectionString,
})

function query(text, params) {
  return pool.query(text, params)
}

module.exports = {
  query: query,
  connectionParams: connectionString,
}
