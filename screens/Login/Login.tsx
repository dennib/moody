import { Button } from 'components';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { View, Text, TextInput } from 'react-native';
import { useAuthSelector } from 'stores/auth';

import { loginStyles } from './Login.styles';

const Login = () => {
  const { handleLogin } = useAuthSelector();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>();

  const doLogin = async () => {
    try {
      await handleLogin(username, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={loginStyles.container}>
      <StatusBar style="auto" />

      <Text>Moody Login</Text>
      <TextInput
        style={loginStyles.input}
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={loginStyles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      {error && <Text>{error}</Text>}
      <Button text="Login" onPress={doLogin} />
    </View>
  );
};

export { Login };
