const mongoose = require('mongoose');
const todoSchema = require('../schema/todo');

module.exports = mongoose.model('todo', todoSchema, 'todo');