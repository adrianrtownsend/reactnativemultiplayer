import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet, ColorSchemeName } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

type Props = {
  signOut: () => void;
  colorScheme?: ColorSchemeName
};

const SignoutButton = ({ signOut, colorScheme }: Props) => (
  <TouchableOpacity onPress={signOut} style={styles.container}>
    <Image  
      source={colorScheme === 'dark' ? 
        require('../assets/images/power-blue.png') : 
        require('../assets/images/power-black.png')
      } 
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 10,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(SignoutButton);