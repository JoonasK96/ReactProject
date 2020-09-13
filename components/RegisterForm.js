/* eslint-disable max-len */
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
// import {postLogIn} from '../hooks/APIhooks';
import FormTextInput from './FormTextInput';
import useSignUpForm from '../hooks/RegisterHooks';
import {postRegistration, postLogIn} from '../hooks/APIhooks';
import {Button, Text, Form} from 'native-base';

const RegisterForm = ({navigation}) => {
  const {setUser, setIsLoggedIn} = useContext(AuthContext);
  // const [usernameAvailable, setUsernameAvailable] = useState('');
  const {inputs, handleInputChange, registerErrors, validateOnSend, checkUserAvailable} = useSignUpForm();

  const doRegister = async () => {
    if (!validateOnSend()) {
      console.log('validate on send failed');
      return;
    }
    try {
      const result = await postRegistration(inputs);
      console.log('new user created:', result);
      const userData = await postLogIn(inputs);
      await AsyncStorage.setItem('userToken', userData.token);
      setIsLoggedIn(true);
      setUser(userData.user);
    } catch (e) {
      console.log('registration error', e.message);
    }
  };

  // const checkUsernameAvailability = async (username) => {
  //  setUsernameAvailable(await checkAvailable(username));
  // console.log(usernameAvailable)
  // };

  return (
    <Form>
      <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>
        Register
      </Text>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
        onEndEditing={checkUserAvailable}
        error={registerErrors.username}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="email"
        onChangeText={(txt) => handleInputChange('email', txt)}
        error={registerErrors.email}

      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="full name"
        onChangeText={(txt) => handleInputChange('full_name', txt)}
        error={registerErrors.full_name}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
        error={registerErrors.password}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="confirm password"
        onChangeText={(txt) => handleInputChange('confirmPassword', txt)}
        secureTextEntry={true}
        error={registerErrors.confirmPassword}
      />
      <Button block info onPress={doRegister}>
        <Text>Register!</Text>
      </Button>
    </Form>
  );
};
RegisterForm.propTypes = {
  navigation: PropTypes.object,
};
export default RegisterForm;
