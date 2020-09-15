import React, { useState, useEffect } from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import moment from 'moment';
import axios from 'axios';

import TodoItem from '../components/TodoItem';
import Color from "../constants/colors";

const Todo = ({navigation}) => {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [todos, setTodos] = useState([]);

  const refreshTodo = () => {
    axios
      .get(`http://10.0.2.2:5000/api/todo/${date}`)
      .then((response) => {
        setTodos(response.data.data.todoList);
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    refreshTodo();
  },[]);

  const todoCheckHandler = (item) => {
    const data = {
      checked: item.checked,
      content: item.content
    };
    axios
      .put(`http://10.0.2.2:5000/api/todo/${date}/${item._id}`, data)
      .then(() => {
        refreshTodo()
      })
      .catch((error) => {
        throw error;
      });
  };

  const renderItem = ({ item }) => {
    return (
      <TodoItem
        todo={item}
        onChecked={todoCheckHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.date}>{date}</Text>

      <FlatList
        style={styles.listContainer}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title={"추가하기"}/>
        </View>
        <View>
          <Text>{`${todos.filter(it => it.checked).length}/${todos.length}`}</Text>
        </View>
        <View style={styles.button}>
          <Button title={"저장하기"}/>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Color.general,
    padding: 50,
  },
  date: {
    fontSize: 25
  },
  listContainer: {
    width: "100%",
    marginVertical: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%"
  },
  button: {
    width: 100
  }
});

export default Todo;