import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AuthContext } from '../AuthContext';

import LoadingScreen from '../screens/LoadingScreen';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';


const MainStackNavigator = () => {
  const auth = useContext(AuthContext);
  console.log('auth context: ', auth);
  if(auth.state.loading) {
    return <LoadingScreen />
  } else

  if(auth.state.user) {
    const Home = createStackNavigator();

    return (
      <Home.Navigator screenOptions={{ headerShown: false }}>
        <Home.Screen name="Home" component={HomeScreen}/>
        <Home.Screen name="Game" component={GameScreen}/>
      </Home.Navigator>
    );
  } else {
    const Login = createStackNavigator();

    return  (
      <Login.Navigator>
        <Login.Screen name="Login" component={LoginScreen}/>
        <Login.Screen name="Signup" component={SignupScreen} />
      </Login.Navigator>
    );
  }
  
};

export default MainStackNavigator;