/* eslint-disable max-len */
import React, {useContext, useState, useEffect} from 'react';
import {Image} from 'react-native';
import {AuthContext} from '../contexts/AuthContext';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Content,
  Card,
  Icon,
  CardItem,
  Text,
  Body,
  Button,
} from 'native-base';
import {getAvatar} from '../hooks/APIhooks';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(AuthContext);
  const [avatar, setAvatar] = useState([{filename: ''}]);

  const fetchAvatar = async () => {
    setAvatar(await getAvatar(user.user_id));
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  console.log('Profile.js', avatar[0].filename);

  console.log('logged in user data:', user);
  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };
  return (
    <Container style={{backgroundColor: '#93BBF5'}}>
      <Content>
        {user && (
          <Card>
            <CardItem header bordered style={{backgroundColor: '#7A88DE'}}>
              <Icon name="person" />
              <Text style={{color: 'black'}}>Username: {user.username}</Text>
            </CardItem>
            <CardItem style={{backgroundColor: '#7A88DE'}}>
              <Image
                source={{uri: mediaUrl + avatar[0].filename}}
                style={{height: 400, width: null, flex: 1}}
              />
            </CardItem>
            <CardItem style={{backgroundColor: '#7A88DE'}}>
              <Body>
                <Text>Fullname: {user.full_name}</Text>
                <Text>Email: {user.email}</Text>
              </Body>
            </CardItem>
            <CardItem style={{backgroundColor: '#7A88DE'}}>
              <Body>
                <Button block style={{backgroundColor: '#998AFA'}} onPress={logout}>
                  <Text>Logout</Text>
                </Button>
                <Button block style={{backgroundColor: '#998AFA'}} onPress={() => {
                  navigation.navigate('MyFiles');
                }}>
                  <Text>My files</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        )}
      </Content>
    </Container>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
