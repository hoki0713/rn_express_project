import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

import Card from "./Card";

const NoteItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onDetail.bind(this. props.id)}>
      <Card style={styles.listItem}>
        <Text>{props.title}</Text>
      </Card>
    </TouchableOpacity>
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
