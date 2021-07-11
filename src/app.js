const express = require('express');
const morgan = require('morgan');
const app = express();
const rutasAlmacen = require('./router/almacen.router');
const { verificarAdministrador } = require('./middleware/autenticacionAlmacen');

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/almacen', verificarAdministrador, rutasAlmacen);

module.exports = { app };
