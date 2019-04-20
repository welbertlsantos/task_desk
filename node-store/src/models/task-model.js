'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    titulo : {
        type: String,
        required : [true, 'O título é obrigatório'],
        trim : true
    },
    codigoTask : {
        type: String,
        index : true,
        unique : true
    },
    descricao : {
        type: String,
        required : true,
    },
    prioridade  : {
        type: String,
        enum: ['Urgente', 'Normal', 'Baixa'],
        default : 'Normal', 
        required : true
    },
    dataGravacao : {
        type: Date,
        default : Date.now
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }
});

module.exports = mongoose.model('Task', schema)
