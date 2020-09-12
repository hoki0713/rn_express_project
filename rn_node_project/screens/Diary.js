import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
//import axios from 'axios';

import NoteItem from "../components/NoteItem";
import Color from "../constants/colors";

const Diary = (props) => {
  const [notes, setNotes] = useState([]);

  // useEffect(() => {
  //   axios.get('http://192.168.200.193:5000/api/diary')
  //     .then(response => {
  //       setNotes(response.data);
  //     })
  //     .catch(error => {
  //       throw (error);
  //     })
  // },[])

  return (
    <View style={styles.screen}>
      <Button
        title="홈으로"
        color={Color.home}
        onPress={() => props.onHome()}
      />
      <FlatList
        style={styles.listContainer}
        keyExtractor={(item, index) => item.id}
        data={notes}
        renderItem={(itemData) => (
          <NoteItem 
            id={itemData.id}
            onDetail={showDetailHander}
            title={itemData.title}
          />
        )}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="기록하기" color={Color.save} onPress={() => {}} />
        </View>
      </View>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15
  },
  button: {
    width: 100,
    marginHorizontal: 5
  },
});

export default Diary;
