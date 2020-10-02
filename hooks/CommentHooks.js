import {useState} from 'react';
import {validator} from '../utils/validator';

const constraints = {
  comment: {
    presence: {
      message: 'Cannot be empty',
    },
    length: {
      minimum: 2,
      message: 'needs to be at least 2 characters',
    },
  },
};

const useCommentForm = (callback) => {
  const [commentErrors, setCommentErrors] = useState({});
  const [inputs, setInputs] = useState({
    file_id: '',
    comment: '',
  });

  const handleInputChange = (name, text) => {
    const error = validator(name, text, constraints);
    setCommentErrors((commentErrors) => {
      return {
        ...commentErrors,
        [name]: error,
      };
    });

    setInputs((inputs) => {
      return {
        ...inputs,
        [name]: text,
      };
    });
  };

  const validateOnSend = () => {
    const commentError = validator('comment', inputs.comment, constraints);

    if (commentError !== null) {
      return false;
    } else {
      return true;
    }
  };

  return {
    handleInputChange,
    validateOnSend,
    inputs,
    commentErrors,
    setInputs,
  };
};

export default useCommentForm;
