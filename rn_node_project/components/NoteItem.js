import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

import Card from "./Card";
import NoteDetail from "./NoteDetail";

const NoteItem = (props) => {
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [note, setNote] = useState(); 

  const showDetail = (noteData) => {
    setNote(noteData);
    setIsModifyMode(true);
  }

  return (
    // <TouchableOpacity onPress={props.onDetail.bind(this, props.note)}>
    <>
      <TouchableOpacity onPress={props.onDetail.bind(this, props.note)}>
        <Card style={styles.listItem}>
          <View sytle={styles.textContainer}>
            <Text>
              {props.note.date} : {props.note.title}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: 400,
    maxWidth: "100%",
    marginVertical: 5,
    elevation: 0,
  },
});

export default NoteItem;
