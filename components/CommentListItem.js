import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  ListItem as NBListItem,
  Text,
  Card,
  CardItem,
  Content,
} from 'native-base';
import {getUser} from '../hooks/APIhooks';
import AsyncStorage from '@react-native-community/async-storage';

const CommentListItem = ({singleComment}) => {
  const [owner, setOwner] = useState({});
  const fetchOwner = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setOwner(await getUser(singleComment.user_id, userToken));
  };
  useEffect(() => {
    fetchOwner();
  }, []);
  console.log('singlecomment', singleComment);
  return (
    <Card style={{backgroundColor: '#F4EFB3'}}>
      <CardItem cardBody>
        <Text>{singleComment.comment}</Text>
        <Text>{owner.username}</Text>
      </CardItem>
    </Card>
  );
};

CommentListItem.propTypes = {
  singleComment: PropTypes.object,
  navigation: PropTypes.object,
  editable: PropTypes.bool,
};

export default CommentListItem;
