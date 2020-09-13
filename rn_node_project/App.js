import React, { useState } from 'react';
import { StyleSheet, View, YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Remote debugger']);

import Home from './screens/Home';
import Todo from './screens/Todo';
import Note from './screens/Note';
import Writing from './screens/Writing';

import Color from './constants/colors';

export default function App() {
  const [isTodo, setIsTodo] = useState(false);
  const [istNote, setIsNote] = useState(false);
  const [isWriting, setIsWriting] = useState(false);

  const todoHandler = () => {
    setIsTodo(true);
    setIsNote(false);
  };

  const NoteHandler = () => {
    setIsNote(true);
    setIsTodo(false);
    setIsWriting(false);
  }

  const homeHandler = () => {
    setIsTodo(false);
    setIsNote(false);
    setIsWriting(false);
  }

  const writingHandler = () => {
    setIsTodo(false);
    setIsNote(false);
    setIsWriting(true);
  }

  let content = <Home onTodo={todoHandler} onNote={NoteHandler} />;

  if(isTodo) {
    content = <Todo onHome={homeHandler}/>;
  } else if (istNote) {
    content = <Note onHome={homeHandler} onWriting={writingHandler}/>;
  } else if (isWriting) {
    content = <Writing onNote={NoteHandler}/>;
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
