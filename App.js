/* eslint-disable max-len */
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import List from './components/List';


const App = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{height: 200, width: 410, marginBottom: 3}}
          resizeMode='contain'
          source={{uri: 'http://placekitten.com/400/202'}}
        />
        <Text style={styles.header}>
          Homeless cats
        </Text>
      </View>
      <List />
      <StatusBar style='light' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 25,
    color: 'white',
    position: 'absolute',
    top: 125,
    left: 10,
  },

  /*  statusBar: {
      backgroundColor: 'blue',
    },*/
});

export default App;
