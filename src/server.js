require('dotenv').config()

const express = require('express')
const hbs = require('express-handlebars')
const methOverride = require('method-override')

const notes = require('./db/notes')

const app = express()

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout' }))
app.set('views', './views')
app.set('view engine', 'hbs')
app.use(methOverride('_method'))
app.use(express.static('public'))

app.get('/', function(req, res) {
  res.render('home')
})

app.get('/notes', async function(req, res) {
  const allNotes = await notes.all()
  res.render('notes/index', { notes: allNotes })
})

app.get('/notes/new', function(req, res) {
  res.render('notes/new', { body: '' })
})

app.post('/notes/new', async function(req, res) {})

app.delete('/notes/:id', async function(req, res) {
  const { id } = req.params
  await notes.delete(id)
  res.redirect('/notes')
})

app.listen('3000', function() {
  console.log('App is running on port 3000')
})
