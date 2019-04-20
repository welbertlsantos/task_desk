'use strict';

const express = require('express');
const taskRouter = express.Router();
const taskController = require('../controller/task-controller');
const authorization = require('../services/authentication-service');

taskRouter.post('/', authorization.authorize, taskController.created );
taskRouter.put('/:id', authorization.authorize, taskController.update );
taskRouter.delete('/', authorization.authorize, taskController.delete);
taskRouter.get('/', authorization.authorize, taskController.findAll);
taskRouter.get('/:codigoTask', authorization.authorize, taskController.findByCodigoTask);
taskRouter.get('/admin/:id', authorization.authorize, taskController.findById);

module.exports = taskRouter;