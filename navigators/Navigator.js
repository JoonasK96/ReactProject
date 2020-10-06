/* eslint-disable react/display-name */
import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Login from '../views/Login';
import {AuthContext} from '../contexts/AuthContext';
import Upload from '../views/Upload';
import MyFiles from '../views/MyFiles';
import Modify from '../views/Modify';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Button, Icon} from 'native-base';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


const TabScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Upload" component={Upload} />
    </Drawer.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(AuthContext);
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>

          <Stack.Screen name="Home"
            component={TabScreen}
            options={({navigation}) => ({
              // title: 'Awesome app',
              headerLeft: () => (
                // eslint-disable-next-line max-len
                <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())} >
                  <Icon name="menu" />
                </Button>
              ),
            })} />
          <Stack.Screen name="Single" component={Single} />
          <Stack.Screen name="MyFiles" component={MyFiles} />
          <Stack.Screen name="Modify" component={Modify} />
        </>
      ) : (
          <>
            <Stack.Screen name="Login" component={Login} />

          </>
        )}

    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>

      <StackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
