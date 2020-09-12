const express = require('express');
const path = require('path');
const diaryRouter = require("./server/routes/diary");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.static(path.join(__dirname, 'public')))
  .use("/api/diary", diaryRouter)
  .listen(PORT, () => console.log(`App listen to port: ${PORT}`));


