import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Logo from "../components/Logo";
import Card from "../components/Card";

const Home = props => {
  return (
    <View>
      <View style={styles.logoContainer}>
        <Logo />
        <Text style={styles.title}>하루.기록</Text>
        <View style={styles.cardContainer}>
          <Card style={styles.textContainer}>
            <Text onPress={() => props.onTodo()}>오늘할일</Text>
          </Card>
          <Card style={styles.textContainer}>
            <Text onPress={() => props.onDiary()}>하루기록</Text>
          </Card>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 40,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  textContainer: {
    width: "40%",
    marginHorizontal: 10,
    alignItems: 'center'
  },
});

export default Home;
