const db = require('./index')

async function getNotes() {
  const { rows } = await db.query('SELECT * FROM notes')
  return rows
}

async function createNote(title, body) {
  const { rows } = await db.query(
    'INSERT INTO notes(title, body) VALUES ($1, $2) RETURNING id',
    [title, body]
  )
  return rows[0]
}

async function getNote(id) {
  const { rows } = await db.query(`SELECT * FROM notes where id=$1`, [id])
  return rows[0]
}

async function deleteNote(id) {
  await db.query('DELETE FROM notes WHERE notes.id = $1', [id])
}

module.exports = {
  all: getNotes,
  new: createNote,
  get: getNote,
  delete: deleteNote,
}
