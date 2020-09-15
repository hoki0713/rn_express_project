import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const TodoItem = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const refreshCheckedValue = () => {
    setIsChecked(props.todo.checked);
  }

  useEffect(() => {
    refreshCheckedValue()
  },[props]);

  return (
    <View style={styles.todoContainer}>
      <CheckBox
        value={isChecked}
        onChange={props.onChecked.bind(this, {...props.todo, checked: !isChecked})}
      />
      <Text style={isChecked ? styles.checkedContent : styles.content}>
        {props.todo.content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  content: {
    fontSize: 20
  },
  checkedContent: {
    fontSize: 20,
    textDecorationLine: "line-through"
  }
});

export default TodoItem;