const mongoose = require('mongoose');

const url = "mongodb+srv://hokiLog:bonjour!33@cluster0.zy9dh.mongodb.net/hoki-daily-log?retryWrites=true&w=majority";
mongoose.connect(url, { dbName: 'hoki-daily-log'},err => {
  console.log('err::' + err);
});

const Schema = mongoose.Schema;
const todoSchema = new Schema({
  date: String,
  content: Array
});

module.exports = mongoose.model('todo', todoSchema, 'todo');