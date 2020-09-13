import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import axios from 'axios';

import NoteItem from "../components/NoteItem";
import Color from "../constants/colors";

const Note = (props) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://10.0.2.2:5000/api/diary')
      .then(response => {
        setNotes(response.data.data);
      })
      .catch(error => {
        throw (error);
      })
  },[])

  const detailHandler = (noteId) => {
    
  }

  const renderItem = ({ item }) => {
    return (
      <NoteItem id={item._id} note={item} onDetail={detailHandler}/>
    )
  }

  return (
    <View style={styles.screen}>
      <Button
        title="홈으로"
        color={Color.home}
        onPress={() => props.onHome()}
      />
      <FlatList
        style={styles.listContainer}
        keyExtractor={item => item.id}
        data={notes}
        renderItem={renderItem}
      />
      <Button 
        title="기록하기" 
        color={Color.save} 
        onPress={() => props.onWriting()} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  listContainer: {
    marginTop: 10,
  }
});

export default Note;
