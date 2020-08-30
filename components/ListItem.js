/* eslint-disable max-len */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{uri: props.singleMedia.thumbnails.w160}}
        />
      </View>
      <View style={styles.textview}>
        <Text style={styles.title}>{props.singleMedia.title}</Text>
        <Text style={styles.description}>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    padding: 15,
    marginBottom: 5,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  textview: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});


ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

export default ListItem;
