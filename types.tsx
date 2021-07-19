/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
*/
import { DrawerNavigationProp } from '@react-navigation/drawer';

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Game: { sessionId: string } | undefined;
  Login: undefined;
  Signup: undefined;
};

export type LoginProps = {
  navigation: DrawerNavigationProp<MainStackParamList,'Login'>;
};

export type SignupProps = {
  navigation: DrawerNavigationProp<MainStackParamList,'Signup'>;
};

export type AuthDetails = {
  email: string;
  password: string;
  name?: string;
};

export type Navigation = {
  navigate: (scene: string) => void;
};

export interface ICarousel {
  items: Array<object>,
  item: {
    title: string,
    authors: string,
    description?: string,
    minUsers: number,
    maxUsers: number,
    component: () => JSX.Element
  } | object,
  index: number
};