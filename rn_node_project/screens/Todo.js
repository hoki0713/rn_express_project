import React, { useState } from "react";
import { View, FlatList, StyleSheet, Button } from "react-native";

import GoalInput from "../components/GoalInput";
import GoalItem from "../components/GoalItem";

import Color from "../constants/colors";

const Todo = (props) => {
  const [todayGoals, setTodayGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = (goalTitle) => {
    setTodayGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    setIsAddMode(false);
  };

  const cancelGoalAdditionalHandler = () => {
    setIsAddMode(false);
  };

  const removeGoalHandler = (goalId) => {
    setTodayGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  return (
    <View style={styles.screen}>
      <Button title="홈으로" color={Color.home} onPress={() => props.onHome()}/>
      <FlatList
        style={styles.listContainer}
        keyExtractor={(item, index) => item.id}
        data={todayGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="추가하기"
            color={Color.ok}
            onPress={() => setIsAddMode(true)}
          />
        </View>
        <View style={styles.button}>
          <Button title="저장하기" color={Color.save} onPress={() => {}} />
        </View>
        <View style={styles.button}>
          <Button title="오늘 끝" color={Color.cancel} onPress={() => {}} />
        </View>
      </View>
      <GoalInput
        visible={isAddMode}
        onAddGoal={addGoalHandler}
        onCancel={cancelGoalAdditionalHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 50,
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
  listContainer: {
    marginTop: 10,
  },
});

export default Todo;
