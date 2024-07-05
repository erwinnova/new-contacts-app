import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  SplashScreen: undefined;
  Home: undefined;
  ContactDetails: {id: string};
  ContactUpdate: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type ContactDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'ContactDetails'
>;
export type ContactUpdatelProps = NativeStackScreenProps<
  RootStackParamList,
  'ContactUpdate'
>;
export type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;
