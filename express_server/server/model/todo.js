const Schema = require('./dbSchema');
const mongoose = require('mongoose');

const todoSchema = new Schema({
  date: String,
  todoList: [new Schema({
    checked: Boolean,
    content: String
  })]
});

module.exports = mongoose.model('todo', todoSchema, 'todo');