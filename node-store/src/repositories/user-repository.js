'use strict'

const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.findAll = async() => {
    const res = await User.find({}); 
    return res;
}

exports.findByEmail = async(email ) => {
    const res = await User.findOne({
        email: email}
        , 'email');
    return res; 
}

exports.findById = async(id) => {
    const res = await User.findById(id); 
    return res;
}

exports.created = async (data) => {
    var usuario = new User(data);
    await usuario.save();
}

exports.update = async (id, data) => {
    await User.findByIdAndUpdate(id, {
        $set: {
            email: data.email,
            password: data.password
        }
    })
}

exports.delete = async (id) => {
    await User.findOneAndRemove(id);
}





