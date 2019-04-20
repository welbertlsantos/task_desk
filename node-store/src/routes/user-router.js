'use strict';

const express = require('express');
const userRouter = express.Router();
const usuarioController = require('../controller/user-controller');

userRouter.post('/', usuarioController.created );
userRouter.put('/:id', usuarioController.update );
userRouter.delete('/', usuarioController.delete);
userRouter.get('/', usuarioController.findAll);
userRouter.get('/:email', usuarioController.findByEmail);
userRouter.get('/admin/:id', usuarioController.findById);

module.exports = userRouter;