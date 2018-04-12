require('dotenv').config()

const R = require('ramda')
const { connectionParams } = require('../index')
const dbName = connectionParams.database
const knex = require('knex')({ client: 'pg', connection: R.dissoc('database', connectionParams) })

knex.raw(`CREATE DATABASE ${dbName}`).then(function() {
  knex.destroy()
  console.log(`Database ${dbName} created successfully!`);
}).catch(function(e) {
  console.log(e)
  knex.destroy()
})




