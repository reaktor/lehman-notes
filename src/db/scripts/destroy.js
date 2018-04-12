require('dotenv').config()

const R = require('ramda')
const { connectionParams } = require('../index')
const dbName = connectionParams.database
const knex = require('knex')({ client: 'pg', connection: R.dissoc('database', connectionParams) })

knex.raw(`DROP DATABASE ${dbName}`).then(function() {
  knex.destroy()
  console.log(`Database ${dbName} deleted successfully!`);
}).catch(function(e) {
  console.log(`Database ${dbName} doesn't exist...moving on.`)
  knex.destroy()
})




