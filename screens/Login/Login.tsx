import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "screens/RootStackParams";
import { LOGIN } from "utils/constants";

type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  typeof LOGIN
>;

const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Login page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingTop: 40,
  },
});

export { Login };
