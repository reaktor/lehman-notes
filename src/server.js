require('dotenv').config()

const express = require('express')
const session = require('cookie-session')
const cookie = require('cookie-parser')
const flash = require('connect-flash')
const hbs = require('express-handlebars')
const methOverride = require('method-override')

const notes = require('./db/notes')

const app = express()

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout' }))
app.set('views', './views')
app.set('view engine', 'hbs')
app.use(cookie('secret'))
app.use(session({ name: 'sess', keys: ['kwy1', 'kdjf4'], maxAge: 60000 }))
app.use(flash())
app.use(methOverride('_method'))
app.use(express.static('public'))

app.get('/', function(req, res) {
  res.render('home')
})

app.get('/notes', async function(req, res) {
  const allNotes = await notes.all()
  const messages = req.flash()
  res.render('notes/index', { notes: allNotes, messages: messages })
})

app.get('/notes/new', function(req, res) {
  res.render('notes/new', { body: '' })
})

app.post('/notes/new', async function(req, res) {})

app.delete('/notes/:id', async function(req, res) {
  const { id } = req.params
  await notes.delete(id)
  req.flash('info', `Note with id: ${id} was deleted successfully.`)
  res.redirect('/notes')
})

app.listen('3000', function() {
  console.log('App is running on port 3000')
})
