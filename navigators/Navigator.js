import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Login from '../views/Login';
import {AuthContext} from '../contexts/AuthContext';
import Upload from '../views/Upload';
import MyFiles from '../views/MyFiles';
import Modify from '../views/Modify';
import {createDrawerNavigator} from '@react-navigation/drawer';


const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const TabScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Upload" component={Upload} />
    </Tab.Navigator>
  );
};

const StackScreen = () => {
  const {isLoggedIn} = useContext(AuthContext);
  return (
    // <Stack.Navigator>
    <Drawer.Navigator initialRouteName="Home">


      {isLoggedIn ? (
        <>
          <Drawer.Screen name="Home" component={TabScreen} />
          <Drawer.Screen name="Single" component={Single} />
          <Drawer.Screen name="MyFiles" component={MyFiles} />
          <Drawer.Screen name="Modify" component={Modify} />
          {/* // <Stack.Screen name="Home" component={TabScreen} />
          // <Stack.Screen name="Single" component={Single} />
          // <Stack.Screen name="MyFiles" component={MyFiles} />
        // <Stack.Screen name="Modify" component={Modify} /> */}
        </>
      ) : (
          <>
            {/* <Stack.Screen name="Login" component={Login} /> */}
            <Drawer.Screen name="Login" component={Login} />
          </>
        )}

    </Drawer.Navigator>
    // </Stack.Navigator>
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
