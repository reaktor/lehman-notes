exports.up = async function(knex) {
  return await knex.schema.raw(`
    CREATE TABLE notes(
      id SERIAL PRIMARY KEY,
      body text NOT NULL,
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

exports.down = async function(knex) {
  return await knex.schema.raw(`DROP TABLE IF EXISTS notes`)
}
