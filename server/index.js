const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { connection } = require('./db/index');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', require('./api/index'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
);

connection
  .sync()
  .then(() => app.listen(PORT, () => console.log(`Listening at port: ${PORT}`)))
  .catch(console.error);
