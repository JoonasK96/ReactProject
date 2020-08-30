/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import List from './components/List';


const App = () => {
  return (
    <View style={styles.container}>
      <List />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
