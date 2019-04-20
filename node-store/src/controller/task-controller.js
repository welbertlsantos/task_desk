'use strict';

const mongoose = require('mongoose');
const Task = mongoose.model('Task');
const repository = require('../repositories/task-repository');
const guid = require('guid');

exports.findAll = async (req, res, next ) => {
    try {
        var data = await repository.findAll();
        res.status(200).send(data);
    }
    catch (e){
        res.status(500).send({
            message : 'Falha ao processar a requisição!'
        });
    }   
}

exports.findByCodigoTask = async (req, res, next ) => {
    try{
        var data = await repository.findByCodigoTask(req.params.codigoTask)
        res.status(200).send(data);       
    }
    catch (e){
        res.status(500).send({
            message : 'Falha ao processar a requisição!'
        });
    }  
}

exports.findById = async(req, res, next ) => {
    try{
        var data = await repository.findById(req.params.id)
        res.status(200).send(data); 
    }
    catch (e){
        res.status(500).send({
            message : 'Falha ao processar a requisição!'
        });
    }         
        
}

exports.created = async (req, res, next) => {
    try{
        var data = await repository.created({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            user: req.body.user,
            codigoTask : guid.raw().substring(0,6)
        })
        res.status(201).send({message: 'Tarefa cadastrada com sucesso!'});   
    }
    catch (e){
        res.status(500).send({
            message : 'Falha ao processar a requisição!'
        });
    }      
}

exports.update = async (req, res, next) => {
    try{
        var data = await repository.update(req.params.id, req.body)
        res.status(200).send({message: 'Tarefa atualizada com sucesso!'});       
    }
    catch (e){
        res.status(500).send({
            message : 'Falha ao processar a requisição!'
        });
    } 
      
}

exports.delete = async (req, res, next) => {
    try{
        var data = await repository.delete(req.body.id)
        res.status(200).send({message: 'Tarefa excluida com sucesso!'}); 
    }
    catch (e){
        res.status(500).send({
            message : 'Falha ao processar a requisição!'
        });
    }       
}




