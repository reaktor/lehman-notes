const { Pool } = require('pg');

export const connectionParams = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
}

const pool = new Pool(connectionParams)

export const db = {
  query: function(text, params) { return pool.query(text, params) }
}
