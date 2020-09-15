import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Color from '../constants/colors';
import Logo from "../components/Logo";
import Card from "../components/Card";

const Home = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <View style={styles.logoContainer}>
        <Logo />
        <Text style={styles.title}>하루.기록</Text>
        <View style={styles.cardContainer}>
          <Card style={styles.textContainer}>
            <Text onPress={() => navigation.navigate('todo')}>오늘할일</Text>
          </Card>
          <Card style={styles.textContainer}>
            <Text onPress={() => navigation.navigate('note')}>메모장</Text>
          </Card>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.general
  },
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
