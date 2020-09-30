/* eslint-disable max-len */
import React, {useState, useEffect, useContext} from 'react';
import {Image} from 'react-native';
import PropTypes from 'prop-types';
import {Card, CardItem, Left, Icon, Title, Container, Content, Text, Button} from 'native-base';
import {Video} from 'expo-av';
import {getFavourite, getUser, postFavourite} from '../hooks/APIhooks';
import AsyncStorage from '@react-native-community/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
import {AuthContext} from '../contexts/AuthContext';
import useStateWithCallback from 'use-state-with-callback';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Single = ({route}) => {
  const {user} = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [owner, setOwner] = useState({});
  const [favourites, setFavourites] = useStateWithCallback([], (favourites) => {
    console.log('asdasd', favourites);
    favourites.forEach((favourite) => {
      console.log('failED', favourite, user);
      if (favourite.user_id == user.user_id) {
        setFavourited(true);
      };
    });
  });
  const [favourited, setFavourited] = useState(false);
  const [videoRef, setVideoRef] = useState(null);
  const {file} = route.params;

  const handleVideoRef = (component) => {
    setVideoRef(component);
  };

  const showVideoInFullscreen = async () => {
    try {
      await videoRef.presentFullscreenPlayer();
    } catch (e) {
      console.log('svifs error', e.message);
    }
  };

  const unlock = async () => {
    await ScreenOrientation.unlockAsync();
  };

  const lock = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  };

  const fetchData = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    setOwner(await getUser(file.user_id, userToken));
    setFavourites(await getFavourite(file.file_id));
  };

  useEffect(() => {
    unlock();
    fetchData();
    const orientSub = ScreenOrientation.addOrientationChangeListener((evt) => {
      console.log('orientation', evt);
      if (evt.orientationInfo.orientation > 2) {
        showVideoInFullscreen();
      }
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientSub);
      lock();
    };
  }, [videoRef]);

  console.log('kuva', favourited, favourites);
  return (
    <Container>
      <Content padder>
        <Card>
          <CardItem>
            <Left>
              <Icon name={'image'} />
              <Title>{file.title}</Title>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <>
              {file.media_type === 'image' ?
                <Image
                  source={{uri: mediaUrl + file.filename}}
                  style={{height: 400, width: null, flex: 1}}
                /> :
                <Video
                  ref={handleVideoRef}
                  source={{
                    uri:
                      error ? 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' :
                        mediaUrl + file.filename,
                  }}
                  style={{height: 400, width: null, flex: 1}}
                  useNativeControls={true}
                  resizeMode="cover"
                  posterSource={{uri: mediaUrl + file.screenshot}}
                  usePoster={true}
                  posterStyle={{height: 400, width: null, flex: 1}}
                  onError={(err) => {
                    console.log('Video error', err);
                    setError(true);
                  }}
                />
              }
            </>
          </CardItem>
          <CardItem style={{flexDirection: 'column'}}>
            <Text>
              {file.description}
            </Text>
            <Text>
              By: {owner.username}
            </Text>
            <Button info disabled={favourited} onPress={async () => {
              try {
                const userToken = await AsyncStorage.getItem('userToken');
                postFavourite(file.file_id, userToken);
              } catch (e) {
                console.log(e);
              }
            }}>
              <Text>LIKE</Text>
            </Button>
          </CardItem>
        </Card>
      </Content>
    </Container>

  );
};

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
