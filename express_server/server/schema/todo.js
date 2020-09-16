const Schema = require('./dbSchema');

const todoSchema = new Schema({
  date: String,
  todoList: [new Schema({
    checked: Boolean,
    content: String
  })]
});

module.exports = todoSchema;