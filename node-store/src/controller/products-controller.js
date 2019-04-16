'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

//find All
exports.get = (req, res, next ) => {
    Product
    .find({active : true}, 'title description slug')
    .then(data => {
        res.status(200).send(data);        
    })
    .catch( e => {
        res.status(400).send(e);
    });
};

//find By Slug
exports.getBySlug = (req, res, next ) => {
    Product
    .findOne({
        slug: req.params.slug,
        active : true}
        , 'title description slug price tags')
    .then(data => {
        res.status(200).send(data);        
    })
    .catch( e => {
        res.status(400).send(e);
    });
};

//find By Id
exports.getById = (req, res, next ) => {
    Product
    .findById( req.params.id)
    .then(data => {
        res.status(200).send(data);        
    })
    .catch( e => {
        res.status(400).send(e);
    });
};

//find By Tags
exports.getByTag = (req, res, next ) => {
    Product
    .find({
        tags: req.params.tags,
        active: true},
        'Title description price slug tags')
    .then(data => {
        res.status(200).send(data);        
    })
    .catch( e => {
        res.status(400).send(e);
    });
};


//insert product
exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product
        .save()
        .then( x => {
            res.status(201).send({message: 'Produto cadastrado com sucesso!'});        
        })
        .catch( e => {
            res.status(400).send({message: 'Falha ao cadastrar o produto!', data: e});
        });
};

exports.put = (req, res, next) => {
    Product
    .findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    })
    .then( x => {
        res.status(200).send({message: 'Produto atualizado com sucesso!'});        
    })
    .catch( e => {
        res.status(400).send({message: 'Falha ao atualizar o produto!', data: e});
    });  
};

exports.delete = (req, res, next) => {
    Product
    .findOneAndRemove(req.body.id)
    .then( x => {
        res.status(200).send({message: 'Produto excluido com sucesso!'});        
    })
    .catch( e => {
        res.status(400).send({message: 'Falha ao excluir produto!', data: e});
    });
};