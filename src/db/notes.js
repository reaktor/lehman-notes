const db = require('./index')

async function getNotes() {
  const { rows } = await db.query('SELECT * FROM notes')
  return rows
}

module.exports = {
  all: getNotes,
}
