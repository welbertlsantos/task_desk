'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const repository = require('../repositories/user-repository');
const ValidacaoCampo = require('../validator/fluentValidator');
const md5 = require('md5');

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

exports.findByEmail = async (req, res, next ) => {
    try{
        var data = await repository.findByEmail(req.query.email)
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
    let contract = new ValidacaoCampo();
    contract.hasMinLen(req.body.password, 6, 'O campo senha deverá ter pelo menos 6 caracteres.');
    contract.isEmail(req.body.email, 'E-mail inválido!');

    /* verificando se as validacoes foram ok */
    
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return ;
    }
    try{
        var data = await repository.created({
            email: req.body.email,
            password: md5(req.body.password + global.CHAVE_PRIVADA),
            profile : req.body.profile
        })
        res.status(201).send({message: 'Usuário cadastrado com sucesso!'});   
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
        res.status(200).send({message: 'Usuário atualizado com sucesso!'});       
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
        res.status(200).send({message: 'Usuário excluido com sucesso!'}); 
    }
    catch (e){
        res.status(500).send({
            message : 'Falha ao processar a requisição!'
        });
    }       
}




