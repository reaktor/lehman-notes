require('dotenv').config()
const { connectionParams } = require('./db')

module.exports = {
  client: 'pg',
  connection: connectionParams,
  pool: { min: 0, max: 7 },
}
