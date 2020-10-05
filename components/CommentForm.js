/* eslint-disable max-len */
import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import {postComment} from '../hooks/APIhooks';
import FormTextInput from './FormTextInput';
import useCommentForm from '../hooks/CommentHooks';
import {Button, Text, Form} from 'native-base';

const CommentForm = ({pekka}) => {
  const [kommentit, setKommentit] = useState('tänne tulee kommentit');
  const {
    handleInputChange,
    inputs,
    commentErrors,
    validateOnSend,
    setInputs,
  } = useCommentForm();
  useEffect(() => {
    setInputs({file_id: pekka});
  }, []);

  const doComment = async () => {
    if (!validateOnSend()) {
      console.log('validate on send failed');
      return;
    }
    try {
      const kissa = await AsyncStorage.getItem('userToken');
      const userData = await postComment(kissa, inputs);
      console.log('user comment success', userData);
    } catch (e) {
      console.log('comment error', e.message);
    }
  };
  console.log(inputs);
  return (
    <>
      <Form>
        <FormTextInput
          autoCapitalize="none"
          placeholder="comment"
          onChangeText={(txt) => handleInputChange('comment', txt)}
          error={commentErrors.comment}
        />
        <Button
          style={{backgroundColor: '#998AFA'}}
          block
          onPress={doComment}
        >
          <Text>Comment!</Text>
        </Button>
      </Form>
      <Text>{kommentit}</Text>
    </>
  );
};

CommentForm.propTypes = {
  pekka: PropTypes.number,
};
export default CommentForm;
