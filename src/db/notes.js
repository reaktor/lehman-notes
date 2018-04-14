const db = require('./index')

async function getNotes() {
  const { rows } = await db.query('SELECT * FROM notes')
  return rows
}

async function deleteNote(id) {
  await db.query('DELETE FROM notes WHERE notes.id = $1', [id])
}

module.exports = {
  all: getNotes,
  delete: deleteNote,
}
