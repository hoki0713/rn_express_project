import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

import Color from "../constants/colors";
import CustomModal from "./CustomModal";

const GoalInput = (props) => {
  const [enteredGoal, setEnteredGoal] = useState("");

  const goalInputHandler = (enteredText) => {
    setEnteredGoal(enteredText);
  };

  const addGoalHandler = () => {
    props.onAddGoal(enteredGoal);
    setEnteredGoal("");
  };

  return (
    <CustomModal
      visible={props.visible}
      mode="overFullScreen"
      animation="slide"
      transparentContainer={true}
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="목표를 입력하세요."
          style={styles.inputBox}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="취소"
              color={Color.cancel}
              onPress={props.onCancel}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="추가"
              color={Color.ok}
              onPress={addGoalHandler}
            />
          </View>
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 350,
  },
  inputBox: {
    width: "80%",
    borderBottomColor: Color.grey,
    borderBottomWidth: 1,
    
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  button: {
    width: "40%",
  },
});

export default GoalInput;
