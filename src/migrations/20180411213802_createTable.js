exports.up = function(knex) {
  return knex.schema.raw(`
    CREATE TABLE notes(
      id SERIAL PRIMARY KEY,
      title text NOT NULL,
      body text NOT NULL,
      created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
}

exports.down = function(knex) {
  return knex.schema.raw(`DROP TABLE IF EXISTS notes`)
}
