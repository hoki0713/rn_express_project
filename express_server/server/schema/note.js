const Schema = require('./dbSchema');

const noteSchema = new Schema({
  date: String,
  title: String,
  content: String
});

module.exports = noteSchema;