require('dotenv').config()

const express = require('express')
const hbs = require('express-handlebars')

const app = express()

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout' }))
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', (req, res) => res.render('home'))

app.listen('3000', () => console.log('App is running on port 3000'))
