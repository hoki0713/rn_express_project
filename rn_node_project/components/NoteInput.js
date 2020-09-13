import React, { useState} from "react";
import { View, TextInput, StyleSheet, Button, Alert } from "react-native";
import axios from 'axios';

import Color from "../constants/colors";
import CustomModal from "./CustomModal";

const NoteInput = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredContent, setEnteredContent] = useState("");

  const titleInputHandler = (enteredText) => {
    setEnteredTitle(enteredText);
  };

  const contentInputHandler = (enteredText) => {
    setEnteredContent(enteredText);
  };

  const saveNoteHandler = () => {
    const data = {
      title: enteredTitle,
      content: enteredContent,
    };
    axios
      .post("http://10.0.2.2:5000/api/note", data)
      .then(() => {
        Alert.alert(
          "메모장",
          "저장 성공",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => props.onCancel() },
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {
        throw error;
      });
    setEnteredTitle("");
    setEnteredContent("");
  };

  return (
    <CustomModal
      style={styles.modal}
      visible={props.visible}
      mode="overFullScreen"
      animation="slide"
      transparentContainer={true}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.title}
          placeholder="Title"
          onChangeText={titleInputHandler}
        />
        <TextInput
          style={styles.content}
          multiline={true}
          numberOfLines={15}
          placeholder="Content"
          onChangeText={contentInputHandler}
        />
        <View style={styles.buttonContainer}>
        <View style={{ width: 70 }}>
          <Button 
            color={Color.save} 
            title="저장" 
            onPress={saveNoteHandler} 
          />
        </View>
        <View style={{ width: 70 }}>
          <Button
            color={Color.cancel}
            title="취소"
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
    height: "100%"
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 350,
  },
  title: {
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: Color.grey,
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  content: {
    width: 300,
    borderColor: Color.grey,
    borderWidth: 1,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    width: 300,
  }
});

export default NoteInput;
