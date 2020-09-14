import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, FlatList, Alert } from "react-native";
import axios from "axios";

import NoteItem from "../components/NoteItem";
import NoteInput from "../components/NoteInput";
import NoteDetail from "../components/NoteDetail";
import Color from "../constants/colors";

const Note = ({ navigation }) => {
  const [notes, setNotes] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);
  const [noteData, setNoteData] = useState({});
  // const [isModifyMode, setIsModifyMode] = useState(false);

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

  const navigationToNoteDetailwithData = (noteData) => {
    navigation.navigate('noteDetail', noteData);
  }

  // const detailHandler = (note) => {
  //   return (
  //     <NoteDetail
  //       note={note}
  //       visible={isModifyMode}
  //       onOk={() => setIsModifyMode(false)}
  //     />
  //   );
  // };

  // const renderItem = ({ item }) => {
  //   return <NoteItem id={item._id} note={item} onDetail={detailHandler} />;
  // };

  return (
    <View style={styles.screen}>
      <Button
        title="홈으로"
        color={Color.home}
        onPress={() => navigation.navigate('home')}
      />
      {notes.map((one) => {
        return (
          <NoteItem 
            id={one._id} 
            note={one}
            onDetail={navigationToNoteDetailwithData}
          />
        )
      })}
      {/* <FlatList
        style={styles.listContainer}
        keyExtractor={(item) => item.id}
        data={notes}
        renderItem={renderItem}
      /> */}
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.general,
    padding: 50,
  },
  listContainer: {
    marginTop: 10,
  },
});

export default Note;
