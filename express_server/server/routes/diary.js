const express = require('express');
const data = require('../model/diary');
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
const empty = require('is-empty');
const stringify = require('json-stringify-pretty-compact');

const router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get("/", (req, res) => {
  data.find((error, diary) => {
    let resultData = "";
    if (!error && !empty(diary)) {
      resultData = diary;
    }
    res.json({ result: empty(error), error: error, data: resultData });
  });
});

router.get("/:id", (req, res) => {
  data.findOne({_id: req.params.id }, (error, diary) => {
    let resultData = "";
    if (!error && !empty(diary)) {
      resultData = diary;
    }
    res.json({ result: empty(error), error: error, data: resultData });
  });
});

router.post("/", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  if (!empty(title) && !empty(content)) {
    const diaryData = new data();
    diaryData.title = title;
    diaryData.content = content;
    const now = new Date();
    diaryData.date = dateFormat(now, "yyyymmdd");

    console.log("diary content diaryData::" + diaryData);

    diaryData.save((error, resultData) => {
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

