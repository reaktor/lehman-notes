require('dotenv').config()

const R = require('ramda')
const { connectionParams } = require('../index')
const dbName = connectionParams.database
const knex = require('knex')({ client: 'pg', connection: R.omit(['database', 'user', 'password'], connectionParams) })

async function destroyDb() {
  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${dbName}`)
    console.log(`Database ${dbName} deleted successfully!`)
  } catch(e) {
    console.log(e)
  } finally {
    knex.destroy()
  }
}

destroyDb()



