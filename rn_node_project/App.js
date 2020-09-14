import React, { useState } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, View, YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Remote debugger']);

import Home from './screens/Home';
import Todo from './screens/Todo';
import Note from './screens/Note';
import NoteDetail from './screens/NoteDetail2';

import Color from './constants/colors';

const stackNavigator = createStackNavigator({
  home: Home,
  note: Note,
  todo: Todo,
  noteDetail: NoteDetail
})

const App = createAppContainer(stackNavigator);

export default App;

// export default function App() {
//   const [isTodo, setIsTodo] = useState(false);
//   const [istNote, setIsNote] = useState(false);

//   const todoHandler = () => {
//     setIsTodo(true);
//     setIsNote(false);
//   };

//   const NoteHandler = () => {
//     setIsNote(true);
//     setIsTodo(false);
//   }

//   const homeHandler = () => {
//     setIsTodo(false);
//     setIsNote(false);
//   }

//   const writingHandler = () => {
//     setIsTodo(false);
//     setIsNote(false);
//   }

//   let content = <Home onTodo={todoHandler} onNote={NoteHandler} />;

//   if(isTodo) {
//     content = <Todo onHome={homeHandler}/>;
//   } else if (istNote) {
//     content = <Note onHome={homeHandler} onWriting={writingHandler}/>;
//   }

//   return (
//     <View style={styles.screen}>
//       {content}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: Color.general
//   }
// });
