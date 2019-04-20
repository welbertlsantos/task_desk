'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');


const app = express();
const router = express.Router();

//Conexão ao Banco de Dados
mongoose.connect(config.conectionString);

//Carregar o modelo
const Task = require('./models/task-model'); 
const User = require('./models/user-model');

//Carregar as rotas
const indexRoute = require('./routes/index-router');
const taskRouter = require('./routes/task-router');
const userRouter = require('./routes/user-router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/tasks', taskRouter);
app.use('/users', userRouter);

module.exports = app;