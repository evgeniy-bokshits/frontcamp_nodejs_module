const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const UsersModelSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
})

UserSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id }, 'myprivatekey');
    return token;
  }

function validateUser(user) {
    const schema = {
      name: Joi.string().min(3).max(50).required(),
      password: Joi.string().min(3).max(255).required()
    };
  
    return Joi.validate(user, schema);
  }

const UsersModel = mongoose.model('users', UsersModelSchema);

exports.UsersModel = UsersModel;
exports.validateUser = validateUser;