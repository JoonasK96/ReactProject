/* eslint-disable max-len */
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = ({navigation}) => {
  // const {navigation} = props;
  // const navigation = props.navigation;
  return (
    <View style={styles.container}>
      <List navigation={navigation} all />
      <StatusBar style="light" translucent={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#93BBF5',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
