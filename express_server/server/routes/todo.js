const express = require('express');
const data = require('../model/todo');
const dateFormat = require('dateformat');
const empty = require('is-empty');

const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  const date = req.body.date;
  const todoList = req.body.todos.map((todo) => ({
    checked: todo.checked,
    content: todo.content
  }));

  if (!empty(todoList)) {
    const todoData = new data();
    todoData.date = date;
    todoData.todoList = todoList;

    todoData.save((error, resultData) => {
      res.json({result: empty(error), error: error, data: resultData});
    });
  } else {
    res.json({result: false, error: null, data: null});
  }
});

router.get("/:date", (req, res) => {
  data.findOne({date: req.params.date}, (error, todo) => {
    let resultData = "";
    if (!error && !empty(todo)) {
      resultData = todo;
    }
    res.json({result: empty(error), error: error, data: resultData})
  });
});

router.put("/:date/:todoId", (req, res) => {
  const todoItemChecked = req.body.checked;
  const todoItemContent = req.body.content;

  data.findOne({date: req.params.date},
    (error, todo) => {
    if(!error && !empty(todo)) {
      todo.todoList.id(req.params.todoId).checked = todoItemChecked;
      todo.todoList.id(req.params.todoId).content = todoItemContent;

      data.updateOne(todo, (error, doc) => {
        res.json({result: !error, error: error});
      });

    } else {
      res.json({result: false, error: null, data: null});
    }
  });
});

module.exports = router;