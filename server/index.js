const express = require('express')
const morgan = require('morgan')
const path = require('path')

const { connection } = require('./db/index')

const PORT = process.env.PORT || 3000
const app = express()

app.use(morgan('dev'))

app.use(express.static(path.join('..', 'public')))

app.use('/api', require('./api/index'))

app.get('/', (req, res) => res.sendfile(path.join('..', 'public', 'index.html')))

connection
    .sync()
    .then(() => app.listen(PORT, () => console.log(`Listening at port: ${PORT}`)))
    .catch(console.error)