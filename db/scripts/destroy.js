require('dotenv').config()

const url = require('url')
const { connectionParams } = require('../index')
const dbName = connectionParams.split('/')[3]
const dbParams = url.parse(connectionParams)
const knex = require('knex')({
  client: 'pg',
  connection: `${dbParams.protocol}//${dbParams.auth}@${dbParams.host}`,
})

async function destroyDb() {
  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${dbName}`)
    await knex.raw(`DROP DATABASE IF EXISTS ${dbName}_test`)
    console.log(`Database ${dbName} and ${dbName}_test deleted successfully!`)
  } catch (e) {
    console.log(e)
  } finally {
    knex.destroy()
  }
}

destroyDb()
