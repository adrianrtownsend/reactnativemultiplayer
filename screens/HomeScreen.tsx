import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import { AuthContext } from '../AuthContext';

import SignoutButton from '../components/SignoutButton';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Toast from "../components/Toast";

const HomeScreen = () => {
  const auth = useContext(AuthContext);
  return (
    <Background>
      <BackButton goBack={()=>console.log('pressed')} />
      <Header>Welcome {auth.state.user.email}!</Header>
      <Header>{'Record: 8W - 1L'}</Header>
      <Header>Select a Game to play</Header>
    </Background>
  )
};

export default HomeScreen;