const Schema = require('./dbSchema');
const mongoose = require('mongoose');

const noteSchema = new Schema({
  date: String,
  title: String,
  content: String
});

module.exports = mongoose.model('note', noteSchema, 'note');


