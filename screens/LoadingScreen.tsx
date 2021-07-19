import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SplashScreen = () => {
  return (
    <View>
      <Text style={styles.textColor}>Loading...</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  textColor: {
    color: '#ffffff'
  }
});