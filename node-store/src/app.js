'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const router = express.Router();

//Conexão ao Banco de Dados
mongoose.connect('mongodb://localhost:27017/nodestor');

//Carrer o modelo
const Product = require('./models/product');

//Carregar as rotas
const indexRoute = require('./routes/index-routes');
const productsRoute = require('./routes/products-routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productsRoute);

module.exports = app;