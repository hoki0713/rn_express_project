const express = require('express');
const data = require('../model/note');
const dateFormat = require('dateformat');
const empty = require('is-empty');

const router = express.Router();

router.get("/", (req, res) => {
  console.log("get")
  data.find((error, note) => {
    let resultData = "";
    if (!error && !empty(note)) {
      resultData = note;
    }
    res.json({ result: empty(error), error: error, data: resultData });
  });
});

router.get("/:id", (req, res) => {
  data.findOne({_id: req.params.id }, (error, note) => {
    let resultData = "";
    if (!error && !empty(note)) {
      resultData = note;
    }
    res.json({ result: empty(error), error: error, data: resultData });
  });
});

router.post("/", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  if (!empty(title) && !empty(content)) {
    const noteData = new data();
    noteData.title = title;
    noteData.content = content;
    const now = new Date();
    noteData.date = dateFormat(now, "yyyymmdd");

    console.log("note content noteData::" + noteData);

    noteData.save((error, resultData) => {
      res.json({ result: empty(error), error: error, data: resultData });
    });
  } else {
    res.json({ result: false, error: null, data: null });
  }
});

router.put("/:id", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const id = req.params.id;

  if (!empty(id)) {
    data.findOneAndUpdate({_id: id}, {$set:
        { title: title, content: content }
    }, {returnNewDocument: true}, (error, doc) => {
      res.json({ result: !error, error: error });
    });
  } else {
    res.json({ result: false, error: null, data: null });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (!empty(id)) {
    data.remove({_id: id}, (error, resultData) => {
      res.json({ result: empty(error), error: error, data: resultData });
    });
  } else {
    res.json({ result: false, error: null, data: null });
  }
});

module.exports = router;

