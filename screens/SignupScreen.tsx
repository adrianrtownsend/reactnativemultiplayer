import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity } from 'react-native';


import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'

import { theme } from "../core/theme";
import { SignupProps } from '../types';
import { AuthContext } from '../AuthContext';


const SignupScreen = ({navigation}: SignupProps) => {
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailInputHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    const val = e.nativeEvent.text;
    setEmail(val);
  };

  const passwordInputHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    const val = e.nativeEvent.text;
    setPassword(val);
  };

  const confirmPasswordInputHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    const val = e.nativeEvent.text;
    setConfirmPassword(val);
  };

  return (
    <Background>
      <Header>React Native Multiplayer</Header>
      <Text>Sign Up</Text>
      <TextInput
        label="Email"
        returnKeyType="next"
        onChange={emailInputHandler}
        autoCapitalize="none"
        value={email}
      />
      <TextInput
        label="Password"
        returnKeyType="next"
        onChange={passwordInputHandler} 
        secureTextEntry
        autoCapitalize="none"
        value={password}
        />
        <TextInput
        label="Confirm Password"
        returnKeyType="done"
        onChange={confirmPasswordInputHandler} 
        secureTextEntry
        autoCapitalize="none"
        value={confirmPassword}
        />
      <Button
        onPress={() => auth.authContext.signUpEmail({email, password})}
        style={styles.button}
        mode="contained"
      >Sign Up</Button>
      <View style={styles.row}>
      <TouchableOpacity onPress={() => navigation.reset({
          index:0,
          routes:[{name:'Login'}]
        }
        )}>
          <Text style={styles.link}>Log In</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );

};

export default SignupScreen;

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary
  },
  button: {
    marginTop: 24
  },
  row: {
    flexDirection: "row",
    marginTop: 4
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary
  }
});