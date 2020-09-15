const express = require('express');
const path = require('path');
const noteRouter = require("./server/routes/note");
const todoRouter = require("./server/routes/todo");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const app = express();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')))
  .use("/api/note", noteRouter)
  .use("/api/todo", todoRouter)
  .listen(PORT, () => console.log(`App listen to port: ${PORT}`));

