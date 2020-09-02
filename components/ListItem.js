/* eslint-disable max-len */
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';


const ListItem = ({navigation, singleMedia}) => {
  return (
    <TouchableOpacity onPress={
      () => {
        navigation.navigate('Single', {file: singleMedia});
      }
    }>
      <View style={styles.imageBox}>
        <Image
          style={{width: 100, height: 100}}
          source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
        />
      </View>

      <View>
        <Text>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageBox: {
    flex: 1,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItem;
