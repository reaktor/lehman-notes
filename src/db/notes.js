const db = require('./index')

async function getNotes() {
  const { rows } = await db.query('SELECT * FROM notes')
  console.log(rows)
  return rows
}

module.exports = {
  all: getNotes,
}
