import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "screens/RootStackParams";
import { HOME } from "utils/constants";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, typeof HOME>;

const Home: React.FC<HomeScreenProps> = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="auto" />
      <Text>Home page</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Home };
