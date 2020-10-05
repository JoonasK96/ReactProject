/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Button, Container, Content, Form, Text, Spinner} from 'native-base';
import FormTextInput from '../components/FormTextInput';
import {Image, Platform} from 'react-native';
import useUploadForm from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
// eslint-disable-next-line no-unused-vars
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {upload, postTag, appIdentifier} from '../hooks/APIhooks';
import AsyncStorage from '@react-native-community/async-storage';
import {Video} from 'expo-av';

const Upload = ({navigation}) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileType, setFileType] = useState('image');

  const doUpload = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      // lisätään tekstikentät formDataan
      formData.append('title', inputs.title);
      formData.append('description', inputs.description);

      // lisätään tiedosto formDataan
      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      let type = match ? `${fileType}/${match[1]}` : fileType;
      if (type === 'image/jpg') type = 'image/jpeg';


      formData.append('file', {uri: image, name: filename, type});

      // haetaan token
      const userToken = await AsyncStorage.getItem('userToken');

      // uploadataan
      const resp = await upload(formData, userToken);
      console.log('File uploaded: ', resp);

      const postTagResponse = await postTag({
        file_id: resp.file_id,
        tag: appIdentifier,
      }, userToken);
      console.log('posting tag:', postTagResponse);

      // odotetaan 2 sekuntia
      setTimeout(() => {
        doReset();
        navigation.push('Home');
      }, 2000);
    } catch (e) {
      console.log('upload error:', e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
        setFileType(result.type);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  const getPermissionAsync = async () => {
    if (Platform.OS !== 'web') {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      console.log('status', status);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const {
    handleInputChange,
    reset,
    uploadErrors,
    inputs,
  } = useUploadForm();

  const doReset = () => {
    reset();
    setImage(null);
    // console.log(inputs);
  };

  return (
    <Container style={{backgroundColor: '#93BBF5'}}>
      <Content padder>
        {image &&
          <>
            {fileType === 'image' ?
              <Image
                source={{uri: image}}
                style={{height: 400, width: null, flex: 1}}
              /> :
              <Video
                source={{uri: image}}
                style={{height: 400, width: null, flex: 1}}
                useNativeControls={true}
              />
            }
          </>
        }
        <Form>
          <FormTextInput
            autoCapitalize="none"
            placeholder="title"
            value={inputs.title}
            onChangeText={(txt) => handleInputChange('title', txt)}
            error={uploadErrors.title}
          />
          <FormTextInput
            autoCapitalize="none"
            placeholder="description"
            value={inputs.description}
            onChangeText={(txt) => handleInputChange('description', txt)}
            error={uploadErrors.description}
          />
        </Form>
        <Button style={{backgroundColor: '#998AFA'}} block info onPress={pickImage}>
          <Text>Choose file</Text>
        </Button>
        <Button block info disabled={uploadErrors.title !== null ||
          uploadErrors.description !== null || image === null} onPress={doUpload}>
          <Text>Upload</Text>
        </Button>
        {isLoading && <Spinner />}
        <Button style={{backgroundColor: '#998AFA'}} block onPress={doReset}>
          <Text>Reset</Text>
        </Button>
      </Content>
    </Container>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
