# Tutorial

### Setup

1.  Make directory `lehman-notes`

2)  Init package.json

```sh
> npm init —yes
> npm install --save-exact --save-dev prettier
```

3.  Setup git repository

    * Make repo on github
    *     `git init`
    * `.gitignore`

    * `npm install —saveExact --save-dev prettier husky pretty-quick`
    * Create prettier config `.prettierrc`:

```json
{
  "singleQuote": true,
  "semi": false,
  "trailingComma": "es5"
}
```

* Add to `package.json` `scripts` section:
  `"precommit": "pretty-quick --staged"`

4.  Eslint
    `npm install --save-exact --save-dev eslint eslint-config-prettier` - `./node_modules/.bin/eslint --init` -> Use popular style guide -> Standard - update `eslintrc.json` to:

```sh
{
  "extends": ["standard", "prettier"]
}
```

5.  **Commit to repo**

### Simple Server

1.  `npm install --save-exact express`

2.  create `server.js` with

```js
const express = require('express')

const app = express()

const port = process.env.PORT || 3000
app.listen(port, function() {
  console.log('App is running on port 3000')
})
```

3.  Run `npm start`
4.  Run `npm run install —save-exact express-handlebars`
5.  Update `server.js`

```js
const hbs = require('express-handlebars')

.....

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout' }))
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', function(req, res) {
  res.render('home')
})
```

6.  create `views/layouts/layout.hbs` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lehman Notes</title>
</head>
<body>
  {{{body}}}
</body>
</html>
```

7.  create `views/home.hbs` with:

```html
<h1>Hello World!</h1>
```

8.  `npm install —save-exact —save-dev nodemon`

9.  Add `package.json` script with:
    `"local": "nodemon server.js"`

10. **Commit to repo**

### Make it Pretty

1.  Create `public/css/stylesheet.css` :

```css
.pretty {
  background-color: blue;
  color: white;
}
```

2.  Update `server.js` under view engine setup:

```js
app.use(express.static('public'))
```

3.  Update `views/layouts/layout.hbs` to load our stylesheet inside the head tag:

```html
  <link rel="stylesheet" href="/css/stylesheet.css"/>
```

4.  Add the class to `views/home.hbs`:

```html
<h1 class="pretty">Hello World!</h1>
```

5.  Add bootstrap.css above our local one to `views/layouts/layout.hbs`:

```html
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"/>
```

6.  Add a header to layout

```html
<body class="bg-light">
  <header class="d-flex justify-content-center navbar navbar-default border-bottom bg-white">
    <a class="navbar-brand" href="/">Lehman Notes</a>
  </header>
  <main class="container mt-4">
    {{{body}}}
  </main>
</body>
```

7.  **Commit to repo**

### Setting up the database

#### Create and Delete DB

1.  `npm install --save-exact --save-dev knex pg`

2.  Create `db/index.js`:

```js
const connectionString = process.env.DATABASE_URL

module.exports = {
  connectionParams: connectionString,
}
```

3.  `npm install —save-exact dotenv`

4.  Create `.env` file:

```sh
DATABASE_URL=postgres://postgres:postgres@localhost:5432/lehman_notes_dev
```

5.  Create `db/scripts/create.js`

```js
require('dotenv').config()

const url = require('url')
const { connectionParams } = require('../index')
const dbName = connectionParams.split('/')[3]
const dbParams = url.parse(connectionParams)
const knex = require('knex')({
  client: 'pg',
  connection: `${dbParams.protocol}//${dbParams.auth}@${dbParams.host}`,
})

async function createDb() {
  try {
    await knex.raw(`CREATE DATABASE ${dbName}`)
    console.log(`Database ${dbName} created successfully!`)
  } catch (e) {
    console.log(e)
  } finally {
    knex.destroy()
  }
}

createDb()
```

6.  Add new script in `package.json`:
    `”db:create”: “node db/scripts/create.js”`

7.  Create `db/scripts/destroy.js`

```js
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
    console.log(`Database ${dbName} deleted successfully!`)
  } catch (e) {
    console.log(e)
  } finally {
    knex.destroy()
  }
}

destroyDb()
```

8.  Add script to `package.json`:
    `"db:destroy": "node db/scripts/destroy.js"`

9.  **Commit to repo**

#### Migrations

1.  Create `knexfile.js` in root:

```js
require('dotenv').config()
const { connectionParams } = require('./db')

module.exports = {
  client: 'pg',
  connection: connectionParams,
  pool: { min: 0, max: 7 },
}
```

2.  Add script to `package.json`:
    `"db:migrate:make": "knex migrate:make"`

3.  Run `npm run db:migrate:make createNotes”`

4.  Go to `migrations/createNotes` and update to:

```js
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
```

5.  Add scripts to `package.json`:

```json
"db:migrate": "knex migrate:latest",
"db:rollback": "knex migrate:rollback"
```

6.  **Commit to repo**

#### Seeds

1.  Update `package.json`
    `"db:seed:make": "knex seed:make"`

2.  Run `npm run db:seed:make notes` which will create a file under `seeds/notes.js` with a skeleton of a seed

3.  Copy paste seedData:

```js
const seedData = [
  {
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body:
      'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    title: 'qui est esse',
    body:
      'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
  },
  {
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body:
      'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
  },
  {
    title: 'eum et est occaecati',
    body:
      'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
  },
  {
    title: 'nesciunt quas odio',
    body:
      'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
  },
]
```

4.  Update seed function to:

```js
exports.seed = async function(knex) {
  await knex('notes').del()
  await knex('notes').insert(seedData)
}
```

5.  Add script to `package.json`:
    `"db:seed": "knex seed:run”`

6.  **Commit to repo**

### Get Notes

1.  In `db/index.js`
    * import on top of file:
      `const { Pool } = require('pg')`
    * add

```js
const pool = new Pool({
  connectionString,
})

function query(text, params) {
  return pool.query(text, params)
}
```

    - and add to export

```js
module.exports = {
  connectionParams: connectionString,
  query,
}
```

2.  Create `db/notes.js`

```js
const db = require('./index')

async function getNotes() {
  const { rows } = await db.query('SELECT * FROM notes')
  return rows
}

module.exports = {
  all: getNotes,
}
```

3.  Update `server.js`

    * on top of file `require('dotenv').config()`

    * Import notes modules
      `const notes = require(‘./db/notes’)`

    * Create route

```js
app.get('/notes', async function(req, res) {
  const allNotes = await notes.all()
  res.render('/notes/index', { notes: allNotes })
})
```

4.  Create `views/notes/index.hbs`

```html
<table class="table table-hover">
  <thead>
    <th class="border-0">Title</th>
  </thead>
  <tbody>
    {{#each notes}}
      <tr>
        <td>{{this.title}}</td>
      </tr>
    {{/each}}
  </tbody>
</table>
```

5.  Add link to same file above the table

```html
<a class="btn btn-success float-right mr-5" href="/notes/new">New Note</a>
```

6.  **COMMIT**

### Create New Note with TDD

1.  In `db/notes.js`
    * add `async function createNote(title, body) {}`
    * export

```js
module.exports = {
  all: getNotes,
  create: createNote,
}
```

2.  `npm install —save-dev —save-exact jest eslint-plugin-jest`

3.  Update `.eslintrc.json”` by adding
    * `"plugin:jest/recommended”` to `extends`
    * add

```json
  "env": {
    "jest/globals": true
  }
```

4.  Add `package.json` task:
    `"test": "jest --forceExit”`

5.  Create test db by updating `db/scripts/create.js`

```js
 await knex.raw(`CREATE DATABASE ${dbName}_test`)
 console.log(`Database ${dbName} and ${dbName}_test created successfully!`)
```

6.  Delete test db by updating`db/scripts/destroy.js`

```js
await knex.raw(`DROP DATABASE IF EXISTS ${dbName}_test`)
console.log(`Database ${dbName} and ${dbName}_test deleted successfully!`)
```

7.  To test, run `npm run db:destroy` and `npm run db:create`

8.  Add to `package.json` under scripts:

```json
  "jest": {
    "globalSetup": "./test/setup.js",
    "globalTeardown": "./test/teardown.js"
  },
```

9.  Create `test/setup.js`

```js
process.env.DATABASE_URL =
  'postgres://postgres:postgres@localhost:5432/lehman_notes_dev_test'

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
})

async function runMigrations() {
  await knex.migrate.latest()
}

module.exports = runMigrations
```

9.  Create `test/teardown.js`

```js
process.env.DATABASE_URL =
  'postgres://postgres:postgres@localhost:5432/lehman_notes_dev_test'

const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
})

async function rollback() {
  await knex.migrate.rollback()
}

module.exports = rollback
```

10. Create `test/notes.js`

```js
const notes = require('./../../db/notes')

test('creating a record from the db', async function() {
  const allBefore = await notes.all()
  expect(allBefore).toHaveLength(0)

  await notes.create(
    'some title',
    "this is the body of the note\n and it's multiline"
  )

  const allAfter = await notes.all()
  expect(allAfter).toHaveLength(1)
})
```

11. Run `npm test` which will fail

12. Update `db/notes.js`

```js
async function createNote(title, body) {
  const { rows } = await db.query(
    'INSERT INTO notes(title, body) VALUES ($1, $2) RETURNING id',
    [title, body]
  )
  return rows[0]
}
```

13. Run `npm test` which should pass now

14. Create `views/notes/form.hbs’

```html
<form method="POST" action="/notes">
  <div class="form-group">
    <label for="title">Title</label>
    <input type="text" class="form-control" id="title" name="title" placeholder="Awesome Note Title" required>
  </div>
  <div class="form-group">
    <label for="body">Note</label>
    <textarea class="form-control" id="body" name="body" rows="3" required></textarea>
  </div>
    <input type="submit" value="Save" class="btn btn-primary mt-4"/>
  </div>
</form>
```

13. `npm install --save-exact body-parser`

14. Require it on top of file
    `const bodyParser = require('body-parser')`
    and then add middleware under `static public`

```js
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
```

15. Create route

```json
app.post("/notes", async function(req, res) {
  const { title, body } = req.body
  const { id } = await notes.create(title, body)
  res.redirect(`/notes/${id}`)
})
```

16. **Commit**

### Update Existing Note

1.  Update `views/notes/form.hbs`
    * update input fields to render values from db

```html
<input type="text" class="form-control" id="title" name="title" placeholder="Awesome Note Title" value="{{this.title}}" required>

....

<textarea class="form-control" id="body" name="body" rows="3" required>{{this.body}}</textarea>
```

3.  Update `db/notes.js`

```js
async function getNote(id) {
  const { rows } = await db.query('SELECT * FROM notes where id=$1', [id])
  return rows[0]
}

...

module.exports = {
  all: getNotes,
  create: createNote,
  get: getNote,
}
```

4.  Update `server.js`

```js
app.get('/notes/:id', async function(req, res) {
  const { id, title, body } = await notes.get(req.params.id)
  res.render(`notes/form`, { id, title, body })
})
```

5.  Update `db/notes.js`:

```js
async function updateNote(id, title, body) {
  await db.query('UPDATE notes SET title=$1, body=$2 WHERE id=$3', [
    title,
    body,
    id,
  ])
}

...

module.exports = {
  all: getNotes,
  create: createNote,
  get: getNote,
  update: updateNote,
}
```

6.  Update `views/notes/form.hbs` onto

```html
{{#if this.id}}
  <form method="POST" action="/notes/{{this.id}}?_method=PUT"/>
{{else}}
  <form method="POST" action="/notes">
{{/if}}
```

7.  `npm install —save-exact method-override`

8.  Import it in `server.js`

```js
const methodOverride = require('method-override’)
…
app.use(methodOverride('_method’))

...

app.put('/notes/:id', async function(req, res) {
  const { id } = req.params
  const { title, body } = req.body
  await notes.update(id, title, body)
  res.redirect(`/notes/${id}`)
})
```

9.  Add a link to update from `views/notes` under `{{this.title}}`

```html
        <td>
          <a class="btn btn-primary" href="/notes/{{this.id}}">Update</a>
        </td>
```

10. **Commit**

### Delete a note

1.  Update `db/notes.js`

```js
async function deleteNote(id) {
  await db.query('DELETE FROM notes WHERE notes.id = $1', [id])
}

...

module.exports = {
  all: getNotes,
  create: createNote,
  get: getNote,
  update: updateNote,
  delete: deleteNote,
}
```

2.  Update `server.js`

```js
app.delete('/notes/:id', async function(req, res) {
  const { id } = req.params
  await notes.delete(id)
  res.redirect('/notes')
})
```

3.  Update `views/notes/index.hbs` under update button

```html
        <td>
          <form method="POST" action="/notes/{{this.id}}?_method=DELETE">
            <input class="btn btn-danger" type="submit" value="Delete" />
          </form>
        <td>
```

### Deployment - Heroku

* Create a project from your heroku account
* Create pipeline
* Enable automatic deploys
* Add add-on Postgres
* Install/update heroku cli
* Add npm and node versions to engines block in package.json
* RUN: heroku run npm run db:migrate -a lehman-notes-part2

- Seed if you want
