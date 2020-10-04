import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  ListItem as NBListItem,
  Left,
  Thumbnail,
  Body,
  Text,
  Right,
  Button,
  Icon,
  Card,
  CardItem,
  Content,
} from 'native-base';
import {deleteFile, getUser, getAvatar} from '../hooks/APIhooks';
import AsyncStorage from '@react-native-community/async-storage';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = ({navigation, singleMedia, editable}) => {
  const [owner, setOwner] = useState({});
  const [avatar, setAvatar] = useState([{filename: ''}]);
  const doDelete = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      const result = await deleteFile(singleMedia.file_id, userToken);
      console.log('delete a file', result);
      navigation.replace('MyFiles');
      // TODO: prompt user before deleting
      // https://reactnative.dev/docs/alert
    } catch (e) {
      console.error(e);
    }
  };
  const fetchOwner = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setOwner(await getUser(singleMedia.user_id, userToken));
  };
  const fetchAvatar = async () => {
    setAvatar(await getAvatar(singleMedia.user_id));
  };
  useEffect(() => {
    fetchOwner();
    fetchAvatar();
  }, []);

  return (
    <NBListItem style={{backgroundColor: '#84DEF5'}}>
      <Content>
        <Card style={{backgroundColor: '#F4EFB3'}}>
          <CardItem style={{backgroundColor: '#F4EFB3'}}>
            <Left>
              <Thumbnail
                source={{uri: mediaUrl + avatar[0].filename}}
              />
              <Body>
                <Text>{singleMedia.title}</Text>
                <Text note numberOfLines={1}> By: {owner.username}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Thumbnail
              square
              source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
              style={{height: 400, width: null, flex: 1}} />

          </CardItem>

          <Right>
            <Button block style={{backgroundColor: '#F595B6'}} onPress={
              () => {
                navigation.navigate('Single', {file: singleMedia});
              }}>
              <Icon name={'eye'}></Icon>
              <Text>View</Text>
            </Button>
            {editable && <>
              <Button success transparent onPress={
                () => {
                  navigation.navigate('Modify', {file: singleMedia});
                }}>
                <Icon name={'create'}></Icon>
                <Text>Modify</Text>
              </Button>
              <Button danger transparent onPress={doDelete}>
                <Icon name={'trash'}></Icon>
                <Text>Delete</Text>
              </Button>
            </>
            }
          </Right>
        </Card>
      </Content>
    </NBListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  editable: PropTypes.bool,
};

export default ListItem;
