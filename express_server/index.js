const express = require('express');
const path = require('path');
const noteRouter = require("./server/routes/note");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static(path.join(__dirname, 'public')))
  .use("/api/note", noteRouter)
  .listen(PORT, () => console.log(`App listen to port: ${PORT}`));


