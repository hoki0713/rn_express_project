import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Home from './screens/Home';
import Todo from './screens/Todo';
import Diary from './screens/Diary';

import Color from './constants/colors';

export default function App() {
  const [isTodo, setIsTodo] = useState(false);
  const [isDiary, setIsDiary] = useState(false);

  const todoHandler = () => {
    setIsTodo(true);
    setIsDiary(false);
  };

  const diaryHandler = () => {
    setIsDiary(true);
    setIsTodo(false);
  }

  const homeHandler = () => {
    setIsTodo(false);
    setIsDiary(false);
  }

  let content = <Home onTodo={todoHandler} onDiary={diaryHandler} />;

  if(isTodo) {
    content = <Todo onHome={homeHandler}/>;
  } else if (isDiary) {
    content = <Diary onHome={homeHandler}/>
  }

  return (
    <View style={styles.screen}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.general
  }
});
