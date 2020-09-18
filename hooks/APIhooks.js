/* eslint-disable max-len */
import {useState, useEffect} from 'react';
import axios from 'axios';

const apiUrl = 'http://media.mw.metropolia.fi/wbma/';
const appIdentifier = 'joonas123';

const useLoadMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      // const response = await fetch(apiUrl + 'media');
      const response = await fetch(apiUrl + 'tags/' + appIdentifier);
      const json = await response.json();
      const media = await Promise.all(json.map(async (item) => {
        const resp2 = await fetch(apiUrl + 'media/' + item.file_id);
        const json2 = await resp2.json();
        return json2;
      }));
      // console.log('loadMedia', media);
      setMediaArray(media);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    loadMedia();
  }, []);

  return mediaArray;
};

const postLogIn = async (userCreds) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userCreds),
  };
  try {
    const response = await fetch(apiUrl + 'login', options);
    const userData = await response.json();
    if (response.ok) {
      return userData;
    } else {
      throw new Error(userData.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const postRegistration = async (newUser) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newUser),
  };
  try {
    console.log(newUser);
    const response = await fetch(apiUrl + 'users', options);
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      throw new Error(result.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const checkToken = async (token) => {
  const options = {
    method: 'GET',
    headers: {'x-access-token': token},
  };
  try {
    const response = await fetch(apiUrl + 'users/user', options);
    const userData = await response.json();
    if (response.ok) {
      return userData;
    } else {
      throw new Error(userData.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const getAvatar = async () => {
  try {
    const response = await fetch(apiUrl + 'tags/avatar_649');
    const avatarImages = await response.json();
    if (response.ok) {
      return avatarImages;
    } else {
      throw new Error(avatarImages.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const checkAvailable = async (username) => {
  try {
    const response = await fetch(apiUrl + 'users/username/' + username);
    const resultData = await response.json();
    if (response.ok) {
      if (resultData.available) {
        return null;
      } else {
        return 'Username ' + username + ' is not available.';
      }
    } else {
      throw new Error(resultData.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
};

const upload = async (fd, token) => {
  const options = {
    method: 'POST',
    headers: {'x-access-token': token},
    data: fd,
    url: apiUrl + 'media',
  };

  try {
    const response = await axios(options);
    // console.log('Axios', response.data);
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

// Post tag to server
const postTag = async (tag, token) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(tag),
  };
  try {
    const response = await fetch(apiUrl + 'tags', options);
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      throw new Error(result.message);
    }
  } catch (e) {
    throw new Error(e.message);
  }
  // http://media.mw.metropolia.fi/wbma/docs/#api-Tag-PostTag
};
export {
  useLoadMedia, postLogIn, checkToken, postRegistration,
  getAvatar, checkAvailable, upload, appIdentifier, postTag,
};
