import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

import Card from "./Card";

const NoteItem = (props) => {

  return (
    <TouchableOpacity onPress={props.onDetail.bind(this, props.note)}>
      <Card style={styles.listItem}>
        <View sytle={styles.textContainer}>
          <Text>
            {props.note.date} : {props.note.title}
          </Text>
        </View>
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
