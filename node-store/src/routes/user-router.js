'use strict';

const express = require('express');
const userRouter = express.Router();
const usuarioController = require('../controller/user-controller');
const authorization = require('../services/authentication-service');

userRouter.post('/', authorization.authorize, usuarioController.created );
userRouter.put('/:id', authorization.authorize, usuarioController.update );
userRouter.delete('/', authorization.authorize, usuarioController.delete);
userRouter.get('/', authorization.authorize, usuarioController.findAll);
userRouter.get('/:email', authorization.authorize, usuarioController.findByEmail);
userRouter.get('/admin/:id', authorization.authorize, usuarioController.findById);
userRouter.post('/auth', usuarioController.authenticate);

module.exports = userRouter;