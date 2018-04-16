require('dotenv').config()

const url = require('url')
const { connectionParams } = require('../index')
const dbName = connectionParams.split('/')[3]
const dbParams = url.parse(connectionParams)
const knex = require('knex')({
  client: 'pg',
  connection: `${dbParams.protocol}//${dbParams.auth}@${dbParams.host}`,
})

async function createDb() {
  try {
    await knex.raw(`CREATE DATABASE ${dbName}`)
    await knex.raw(`CREATE DATABASE ${dbName}_test`)
    console.log(`Database ${dbName} and ${dbName}_test created successfully!`)
  } catch (e) {
    console.log(e)
  } finally {
    knex.destroy()
  }
}

createDb()
