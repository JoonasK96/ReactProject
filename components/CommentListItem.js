import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Text, Card, CardItem, Body, Left, List, ListItem, Thumbnail} from 'native-base';
import {getUser, getAvatar} from '../hooks/APIhooks';
import AsyncStorage from '@react-native-community/async-storage';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const CommentListItem = ({singleComment}) => {
  const [owner, setOwner] = useState({});
  const [avatar, setAvatar] = useState([{filename: ''}]);
  const fetchOwner = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setOwner(await getUser(singleComment.user_id, userToken));
  };
  const fetchAvatar = async () => {
    setAvatar(await getAvatar(singleComment.user_id));
  };
  useEffect(() => {
    fetchOwner();
    fetchAvatar();
  }, []);
  console.log('singlecomment', singleComment);
  return (
    <ListItem>
      <CardItem style={{backgroundColor: '#7A88DE'}}>
        <Left>
          <Thumbnail source={{uri: mediaUrl + avatar[0].filename}} />
          <Body>
            <Text>{owner.username}</Text>
            <Text> {singleComment.comment}</Text>
          </Body>
        </Left>
      </CardItem>
    </ListItem>
  );
};

CommentListItem.propTypes = {
  singleComment: PropTypes.object,
  navigation: PropTypes.object,
  editable: PropTypes.bool,
};

export default CommentListItem;
