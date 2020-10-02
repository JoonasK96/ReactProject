/* eslint-disable max-len */
import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {checkToken} from '../hooks/APIhooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Container, Content, Title, Icon, Button, Text, View} from 'native-base';

const Login = ({navigation}) => { // props is needed for navigation
  const {setIsLoggedIn, setUser} = useContext(AuthContext);
  const [showRegistration, setShowRegistration] = useState(true);
  // console.log('Login', isLoggedIn);

  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token', userToken);
    if (userToken) {
      try {
        const userData = await checkToken(userToken);
        console.log('token valid', userData);
        setIsLoggedIn(true);
        setUser(userData);
      } catch (e) {
        console.log('token check failed', e.message);
      }
      // navigation.navigate('Home');
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return (
    <Container style={{backgroundColor: '#93BBF5'}}>
      <Content padder>
        <Title style={{textAlign: 'center'}}>
          <Icon name='happy' style={{fontSize: 200}} />
        </Title>
        <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>MEEMIAPPI</Text>
        {showRegistration ?
          <LoginForm navigation={navigation} /> :
          <RegisterForm navigation={navigation} />
        }
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>or</Text>
        </View>
        <Button block style={{backgroundColor: '#998AFA'}} onPress={() => {
          setShowRegistration(!showRegistration);
        }}>
          <Text>{showRegistration ? 'Register' : 'Login'}</Text>
        </Button>
      </Content>
    </Container>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
