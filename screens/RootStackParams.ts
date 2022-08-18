import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  MoodChoose: undefined;
};

export type BasePageProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
