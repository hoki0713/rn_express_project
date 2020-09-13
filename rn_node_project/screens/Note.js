import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import axios from "axios";

import NoteItem from "../components/NoteItem";
import NoteInput from "../components/NoteInput";
import NoteDetail from "../components/NoteDetail";
import Color from "../constants/colors";

const Note = (props) => {
  const [notes, setNotes] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [isModifyMode, setIsModifyMode] = useState(false);

  useEffect(() => {
    axios
      .get("http://10.0.2.2:5000/api/note")
      .then((response) => {
        setNotes(response.data.data.reverse());
      })
      .catch((error) => {
        throw error;
      });
  }, [notes]);

  const detailHandler = (note) => {
    return (
      <NoteDetail
        note={note}
        visible={true}
        onOk={() => setIsModifyMode(false)}
      />
    );
  };

  const renderItem = ({ item }) => {
    return <NoteItem id={item._id} note={item} onDetail={detailHandler} />;
  };

  return (
    <View style={styles.screen}>
      <Button
        title="홈으로"
        color={Color.home}
        onPress={() => props.onHome()}
      />
      <FlatList
        style={styles.listContainer}
        keyExtractor={(item) => item.id}
        data={notes}
        renderItem={renderItem}
      />
      <Button
        title="기록하기"
        color={Color.save}
        onPress={() => setIsAddMode(true)}
      />
      <NoteInput visible={isAddMode} onCancel={() => setIsAddMode(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  listContainer: {
    marginTop: 10,
  },
});

export default Note;
