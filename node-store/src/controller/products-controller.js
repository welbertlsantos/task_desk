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

exports.getBySlug = (req, res, next ) => {
    repository
    .getBySlug(req.params.slug)
    .then(data => {
        res.status(200).send(data);        
    })
    .catch( e => {
        res.status(400).send(e);
    });
}

exports.getById = (req, res, next ) => {
    repository.getById(req.params.id)
    .then(data => {
        res.status(200).send(data);        
        })
        .catch( e => {
            res.status(400).send(e);
        });
}

exports.getByTag = (req, res, next ) => {
    repository
    .getByTag(req.params.tags)
    .then(data => {
        res.status(200).send(data);        
    })
    .catch( e => {
        res.status(400).send(e);
    });
}

exports.post = (req, res, next) => {
    repository
    .created(req.body)
        .then( x => {
            res.status(201).send({message: 'Produto cadastrado com sucesso!'});        
        })
        .catch( e => {
            res.status(400).send({message: 'Falha ao cadastrar o produto!', data: e});
        });
}

exports.put = (req, res, next) => {
    repository.update(req.params.id, req.body)
    .then( x => {
        res.status(200).send({message: 'Produto atualizado com sucesso!'});        
    })
    .catch( e => {
        res.status(400).send({message: 'Falha ao atualizar o produto!', data: e});
    });  
}

exports.delete = (req, res, next) => {
    repository.delete(req.body.id)
    .then( x => {
        res.status(200).send({message: 'Produto excluido com sucesso!'});        
    })
    .catch( e => {
        res.status(400).send({message: 'Falha ao excluir produto!', data: e});
    });
}