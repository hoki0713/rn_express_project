import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, FlatList, Alert } from "react-native";
import axios from "axios";

import NoteItem from "../components/NoteItem";
import NoteInput from "../components/NoteInput";
import Color from "../constants/colors";

const Note = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const refreshNotes = () => {
    axios
      .get("http://10.0.2.2:5000/api/note")
      .then((response) => {
        setNotes(response.data.data.reverse());
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    refreshNotes();
  }, []);

  const navigationToNoteDetailWithData = (noteData) => {
    const data = {
      ...noteData,
      refreshNotes: refreshNotes
    }
    navigation.navigate("noteDetail", data);
  };

  const renderItem = ({ item }) => {
    return (
      <NoteItem
        id={item._id}
        note={item}
        onDetail={navigationToNoteDetailWithData}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button
          title="홈으로"
          color={Color.home}
          onPress={() => navigation.navigate("home")}
        />
      </View>

      <FlatList
        style={styles.listContainer}
        keyExtractor={(item) => item.id}
        data={notes}
        renderItem={renderItem}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="기록하기"
          color={Color.save}
          onPress={() => setIsAddMode(true)}
        />
      </View>
      <NoteInput visible={isAddMode} onCancel={() => setIsAddMode(false)} onAdd={refreshNotes} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.general,
    padding: 50,
  },
  listContainer: {
    marginVertical: 10,
  },
  buttonContainer: {
    width: 300,
  },
});

export default Note;
