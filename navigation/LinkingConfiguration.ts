/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Game: {
            screens: {
              GameScreen: 'game/:sessionId?',
            },
          },
          Login: {
            screens: {
              LoginScreen: 'login',
            },
          },
          Signup: {
            screens: {
              SignupScreen: 'signup',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
