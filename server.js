const express = require('express')
const mongoose = require('mongoose')
const app = express()

const config = require('config')
const expressLayouts = require('express-ejs-layouts')
const PORT = config.get('PORT') || 5000
const mongoUri = config.get('mongoUri')

const indexRouter = require('./routes/index.route')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

mongoose.connect(mongoUri, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to db'))


app.use('/', indexRouter)

app.listen(PORT, () => console.log('up and running'))