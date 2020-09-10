import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import Color from '../constants/colors';

const Diary = props => {
  return (
    <View style={styles.screen}>
      <Button title="홈으로" color={Color.home} onPress={() => props.onHome()}/>
      <Text>Diary</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});

export default Diary;