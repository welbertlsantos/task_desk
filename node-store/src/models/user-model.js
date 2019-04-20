'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email : {
        type: String,
        required : [true, 'o email é obrigatório'],
        trim : true,
        unique: true
    },
    password : {
        type: String,
        required : [true, 'a senha é obrigatória'],
        trim : true,
    },
    profile: {
        type: String,
        enum : ['Administrador', 'Usuario'],
        required : [true, 'O perfil é obrigatório']
    } 
});

module.exports = mongoose.model('User', schema)
