import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity } from 'react-native';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import Toast from "../components/Toast";

import { theme } from "../core/theme";
import { emailValidator, passwordValidator } from "../core/utils";

import { LoginProps } from '../types';
import { AuthContext } from '../AuthContext';


const LoginScreen = ({navigation}: LoginProps) => {
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailInputHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    const val = e.nativeEvent.text;
    setEmail(val);
  };

  const passwordInputHandler = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    const val = e.nativeEvent.text;
    setPassword(val);
  };

  return (
    <Background>
      <Header>React Multiplayer</Header>
      <TextInput
        placeholder="Email"
        returnKeyType="next"
        onChange={emailInputHandler}
        value={email}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        returnKeyType="done"
        onChange={passwordInputHandler} 
        secureTextEntry
        value={password}
        autoCapitalize="none"
        />
      <Button
        loading={loading}
        mode="contained"
        onPress={() => auth.authContext.logInEmail({email, password})}
      >Log In</Button>
      <View style={styles.row}>
      <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.reset({
          index:0,
          routes:[{name:'Signup'}]
        }
        )}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )

}

export default LoginScreen;

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24
  },
  row: {
    flexDirection: "row",
    marginTop: 4
  },
  label: {
    color: theme.colors.secondary
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary
  }
});
