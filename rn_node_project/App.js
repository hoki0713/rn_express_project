import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Remote debugger']);

import Home from './src/screens/Home';
import Note from './src/screens/Note';
import NoteDetail from './src/screens/NoteDetail';
import Todo from './src/screens/Todo';

const stackNavigator = createStackNavigator({
  home: Home,
  note: Note,
  todo: Todo,
  noteDetail: NoteDetail
})

const App = createAppContainer(stackNavigator);

export default App;
