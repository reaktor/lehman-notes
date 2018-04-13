require('dotenv').config()

const R = require('ramda')
const { connectionParams } = require('../index')
const dbName = connectionParams.database
const knex = require('knex')({ client: 'pg', connection: R.dissoc('database') })

async function createDb() {
  try {
    await knex.raw(`CREATE DATABASE ${dbName}`)
    console.log(`Database ${dbName} created successfully!`)
  } catch (e) {
    console.log(e)
  } finally {
    knex.destroy()
  }
}

createDb()
