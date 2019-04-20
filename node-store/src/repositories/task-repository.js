'use strict'

const mongoose = require('mongoose');
const Task = mongoose.model('Task');

exports.findAll = async() => {
    const res = await Task.find({}).populate('user'); 
    return res;
}

exports.findByCodigoTask = async(codigoTask ) => {
    const res = await Task.findOne({
        codigoTask: codigoTask}
        , 'titulo descricao codigoTask prioridade dataGravacao');
    return res; 
}

exports.findById = async(id) => {
    const res = await Task.findById(id); 
    return res;
}

exports.created = async (data) => {
    var task = new Task(data);
    await task.save();
}

exports.update = async (id, data) => {
    await Task.findByIdAndUpdate(id, {
        $set: {
            titulo: data.titulo,
            descricao: data.descricao,
            prioridade: data.prioridade
        }
    })
}

exports.delete = async (id) => {
    await Task.findOneAndRemove(id);
}





