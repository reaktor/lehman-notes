const notes = require('./../../db/notes')

it('creating a record from the db', async function() {
  const allBefore = await notes.all()
  expect(allBefore).toHaveLength(0)

  await notes.new(
    'some title',
    "this is the body of the note\n and it's multiline"
  )

  const allAfter = await notes.all()
  expect(allAfter).toHaveLength(1)
})
