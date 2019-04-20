'use strict';

const express = require('express');
const taskRouter = express.Router();
const taskController = require('../controller/task-controller');

taskRouter.post('/', taskController.created );
taskRouter.put('/:id', taskController.update );
taskRouter.delete('/', taskController.delete);
taskRouter.get('/', taskController.findAll);
taskRouter.get('/:codigoTask', taskController.findByCodigoTask);
taskRouter.get('/admin/:id', taskController.findById);

module.exports = taskRouter;