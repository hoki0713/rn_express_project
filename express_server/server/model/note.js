const mongoose = require('mongoose');

const url = "mongodb+srv://hokiLog:bonjour!33@cluster0.zy9dh.mongodb.net/hoki-daily-log?retryWrites=true&w=majority";
mongoose.connect(url, { dbName: 'hoki-daily-log'},err => {
  console.log('err::' + err);
});

const Schema = mongoose.Schema;
const noteSchema = new Schema({
  date: String,
  title: String,
  content: String
});

module.exports = mongoose.model('note', noteSchema, 'note');


