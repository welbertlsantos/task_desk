'use strict'

const jwt = require('jsonwebtoken');
const config = require('../config');

exports.generationToken = async (data) => {
    return jwt.sign(data, global.CHAVE_PRIVADA, { expiresIn : '7d'});
}

exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.CHAVE_PRIVADA);
    return data;
}

exports.authorize = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token){
        res.status(401).json({
            message: 'acesso restrito'
        });
    } else {
        jwt.verify(token, global.CHAVE_PRIVADA, function(error, decoded) {
            if (error) {
                res.status(401).json({
                    message : 'token inválido'
                });
            }else {
                next();
            }
        });
    }


}