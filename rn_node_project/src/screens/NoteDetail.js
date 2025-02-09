import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Button, Alert } from "react-native";
import axios from "axios";

import Color from "../constants/colors";

const NoteDetail2 = ({ navigation }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredContent, setEnteredContent] = useState("");
  const refreshNotes = navigation.getParam('refreshNotes');

  useEffect(() => {
    setEnteredTitle(navigation.getParam('title'));
    setEnteredContent(navigation.getParam('content'));
  },[])

  const titleInputHandler = (enteredText) => {
    setEnteredTitle(enteredText);
  };

  const contentInputHandler = (enteredText) => {
    setEnteredContent(enteredText);
  };

  const updateNoteHandler = () => {
    const data = {
      title: enteredTitle,
      content: enteredContent,
    };
    axios
      .put(`http://10.0.2.2:5000/api/note/${navigation.getParam('_id')}`, data)
      .then(() => {
        Alert.alert(
          "메모장",
          "수정 성공",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => navigation.navigate('note') },
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {
        throw error;
      });
    setEnteredTitle("");
    setEnteredContent("");
    refreshNotes();
  };

  const deleteNoteHandler = () => {
    axios
      .delete(`http://10.0.2.2:5000/api/note/${navigation.getParam('_id')}`)
      .then(() => {
        Alert.alert(
          "메모장",
          "삭제 성공",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => navigation.navigate('note') },
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {
        throw error;
      });
    refreshNotes();
  };

  return (
    <View style={styles.screen}>
      <TextInput
        style={styles.title}
        placeholder="Title"
        value={enteredTitle}
        onChangeText={titleInputHandler}
      />
      <TextInput
        style={styles.content}
        multiline={true}
        numberOfLines={15}
        placeholder="Content"
        value={enteredContent}
        onChangeText={contentInputHandler}
      />
      <View style={styles.buttonContainer}>
        <View style={{ width: 70 }}>
          <Button color={Color.ok} title="확인" onPress={() => navigation.navigate('note')} />
        </View>
        <View style={{ width: 70 }}>
          <Button color={Color.save} title="수정" onPress={updateNoteHandler} />
        </View>
        <View style={{ width: 70 }}>
          <Button
            color={Color.cancel}
            title="삭제"
            onPress={deleteNoteHandler}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.general
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
    paddingHorizontal: 15,
    width: 300,
  },
});

export default NoteDetail2;
