import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, FlatList, Alert} from 'react-native';
import moment from 'moment';
import axios from 'axios';

import TodoItem from '../components/TodoItem';
import TodoInput from '../components/TodoInput';
import Color from "../constants/colors";

const Todo = ({navigation}) => {
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [todos, setTodos] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [oneData, setOneData] = useState({});

  useEffect(() => {
    refreshTodo();
  }, [date]);

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

  const showTodoModal = () => {
    setIsAddMode(true);
  }

  const closeTodoModal = () => {
    setIsAddMode(false);
  }

  const todoCheckHandler = (item) => {
    const data = {
      checked: item.checked,
      content: item.content
    };
    axios
      .put(`http://10.0.2.2:5000/api/todo/${date}/${item._id}`, data)
      .then(() => {
        refreshTodo();
        if (item.isModify) {
          Alert.alert(
            "Todo",
            "수정 성공",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {text: "OK", onPress: () => setIsAddMode(false)},
            ],
            {cancelable: false}
          );
        }
      })
      .catch((error) => {
        throw error;
      });
    setOneData({});
  };

  const deleteTodoHandler = (item) => {
    axios
      .delete(`http://10.0.2.2:5000/api/todo/${item.date}/${item.todo._id}`)
      .then(() => {
        refreshTodo();
        Alert.alert(
          "Todo",
          "삭제 성공",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {text: "OK", onPress: () => setIsAddMode(false)},
          ],
          {cancelable: false}
        );
      })
      .catch(error => {
        throw error;
      });
    setOneData({});
  }

  const todoDetailHandler = (item) => {
    setOneData(item);
    showTodoModal();
  }

  const decreaseDate = () => {
    const oneDayBefore = parseInt(moment(date).format("x"))-(1000*60*60*24);
    setDate(moment(oneDayBefore).format('YYYY-MM-DD'));
  }

  const increaseDate = () => {
    const oneDayAfter = parseInt(moment(date).format("x"))+(1000*60*60*24);
    setDate(moment(oneDayAfter).format('YYYY-MM-DD'));
  }

  const renderItem = ({item}) => {
    return (
      <TodoItem
        todo={item}
        onChecked={todoCheckHandler}
        onDetail={todoDetailHandler}
        onCancel={closeTodoModal}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.dateControlContainer}>
        <Button
          title={"<"}
          color={Color.darkorange}
          onPress={decreaseDate}
        />
        <Text style={styles.date}>{date}</Text>
        <Button
          title={">"}
          color={Color.darkorange}
          onPress={increaseDate}
        />
      </View>

      <FlatList
        style={styles.listContainer}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <View style={styles.buttonContainer}>
        <Text
          style={styles.text}>{`Todo 달성률: ${todos ? Math.floor((todos.filter(it => it.checked).length / todos.length) * 100) : 0}%`}</Text>
        <Text
          style={styles.text}>{`[${todos ? todos.filter(it => it.checked).length : 0}/${todos ? todos.length : 0}]`}</Text>
        <View style={styles.button}>
          <Button
            title={"추가하기"}
            onPress={showTodoModal}
          />
        </View>
      </View>
      <TodoInput
        visible={isAddMode}
        onCancel={closeTodoModal}
        onAdd={refreshTodo}
        date={date}
        todo={oneData}
        onUpdate={todoCheckHandler}
        onDelete={deleteTodoHandler}
      />
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
  dateControlContainer: {
    flexDirection: 'row'
  },
  date: {
    fontSize: 25,
    marginHorizontal: 40
  },
  listContainer: {
    width: "100%",
    marginVertical: 15,
  },
  text: {
    fontSize: 15
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