import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';

import CustomModal from './CustomModal';
import Color from "../constants/colors";

const TodoInput = (props) => {
  const [enteredTodo, setEnteredTodo] = useState("");
  const [isModifyMode, setIsModifyMode] = useState(false);

  useEffect(() => {
    if (props.todo.isModify) {
      setIsModifyMode(props.todo.isModify);
      setEnteredTodo(props.todo.content);
    } else {
      setEnteredTodo("");
      setIsModifyMode(false);
    }
  }, [props])

  const todoInputHandler = (enteredText) => {
    setEnteredTodo(enteredText);
  };

  const saveNewTodo = () => {
    const data = {
      date: props.date,
      todos: [{
        checked: false,
        content: enteredTodo
      }]
    };

    axios
      .post("http://10.0.2.2:5000/api/todo", data)
      .then(() => {
        Alert.alert(
          "Todo",
          "저장 성공",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {text: "OK", onPress: () => props.onCancel()},
          ],
          {cancelable: false}
        );
        props.onAdd();
      })
      .catch((error) => {
        throw error;
      });
    setEnteredTodo("");
  };

  return (
    <CustomModal
      style={styles.modal}
      visible={props.visible}
      mode="overFullScreen"
      animation={"slide"}
      transparentContainer={true}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Write your goal!"}
          onChangeText={todoInputHandler}
          value={enteredTodo}
        />
        <View style={styles.buttonContainer}>
          {isModifyMode ? (
              <>
                <View style={styles.button}>
                  <Button
                    title={"수정"}
                    onPress={props.onUpdate.bind(this, {...props.todo, content: enteredTodo})}
                  />
                </View>
                <View style={styles.button}>
                  <Button
                    color={Color.cancel}
                    title={"삭제"}
                    onPress={props.onDelete.bind(this, props)}
                  />
                </View>
              </>
            ) : (
            <View style={styles.button}>
              <Button
                title={"저장"}
                onPress={saveNewTodo}
              />
            </View>
          )}
          <View style={styles.button}>
            <Button
              color={Color.home}
              title={"취소"}
              onPress={() => props.onCancel()}
            />
          </View>
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center"
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 350,
  },
  input: {
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: Color.grey,
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    width: 200,
  },
  button: {
    width: 60
  }
});

export default TodoInput;