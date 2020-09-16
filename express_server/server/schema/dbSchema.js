const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DB_URL;
mongoose.connect(url, { dbName: process.env.DB_NAME},err => {
  console.log('err::' + err);
});

const Schema = mongoose.Schema;

module.exports = Schema;