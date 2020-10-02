/* eslint-disable max-len */
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {postLogIn} from '../hooks/APIhooks';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/LoginHooks';
import {Button, Text, Form} from 'native-base';

const LoginForm = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(AuthContext);
  const {
    handleInputChange,
    inputs,
    loginErrors,
    validateOnSend,
  } = useLoginForm();

  const doLogin = async () => {
    if (!validateOnSend()) {
      console.log('validate on send failed');
      return;
    }
    try {
      const userData = await postLogIn(inputs);
      console.log('user login success', userData);
      setIsLoggedIn(true);
      setUser(userData.user);
      await AsyncStorage.setItem('userToken', userData.token);
    } catch (e) {
      console.log('login error', e.message);
    }
  };

  return (
    <Form>
      <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>
        Sign in
      </Text>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        error={loginErrors.username}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
        error={loginErrors.password}
      />
      <Button block info onPress={doLogin}>
        <Text>Login!</Text>
      </Button>
    </Form>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object,
};
export default LoginForm;
