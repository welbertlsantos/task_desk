'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const repository = require('../repositories/product.repository');

exports.get = async (req, res, next ) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    }
    catch (e){
        res.status(500).send({
            message : 'Falha ao processar a requisição!'
        });
    }   
}

exports.getBySlug = async (req, res, next ) => {
    try{
        var data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data);       
    }
    catch (e){
        res.status(500).send({
            message : 'Falha ao processar a requisição!'
        });
    }  
}

exports.getById = async(req, res, next ) => {
    try{
        var data = await repository.getById(req.params.id)
        res.status(200).send(data); 
    }
    catch (e){
        res.status(500).send({
            message : 'Falha ao processar a requisição!'
        });
    }         
        
}

exports.getByTag = async (req, res, next ) => {
    try{
        var data = await repository.getByTag(req.params.tags)
        res.status(200).send(data);
    }
    catch (e){
        res.status(500).send({
            message : 'Falha ao processar a requisição!'
        });
    }        
}

exports.post = async (req, res, next) => {
    try{
        var data = await repository.created(req.body)
        res.status(201).send({message: 'Produto cadastrado com sucesso!'});   
    }
    catch (e){
        res.status(500).send({
            message : 'Falha ao processar a requisição!'
        });
    }      
}

exports.put = async (req, res, next) => {
    try{
        var data = await repository.update(req.params.id, req.body)
        res.status(200).send({message: 'Produto atualizado com sucesso!'});       
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
        res.status(200).send({message: 'Produto excluido com sucesso!'}); 
    }
    catch (e){
        res.status(500).send({
            message : 'Falha ao processar a requisição!'
        });
    }       
}




