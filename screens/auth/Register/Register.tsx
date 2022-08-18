import { Button } from 'components';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { View, Text, TextInput } from 'react-native';
import { BasePageProps } from 'screens/RootStackParams';
import { useAuthSelector } from 'stores/auth';

import { registerStyles } from './Register.styles';

const Register = ({ navigation }: BasePageProps<'Register'>) => {
  const { handleSignUp } = useAuthSelector();

  const [email, setEmail] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>();

  const doSignUp = async () => {
    if (password !== confirmPassword) return setError('Passwords do not match');
    try {
      await handleSignUp(displayName, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={registerStyles.container}>
      <StatusBar style="auto" />

      <Text>Moody Sign Up</Text>
      <TextInput
        style={registerStyles.input}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={registerStyles.input}
        onChangeText={setDisplayName}
        value={displayName}
      />
      <TextInput
        style={registerStyles.input}
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TextInput
        style={registerStyles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
      />
      <Text>
        Already have an account?{' '}
        <Text onPress={() => navigation.navigate('Login')}>Sign In</Text>
      </Text>
      {error && <Text>{error}</Text>}
      <Button text="Sign Up" onPress={doSignUp} />
    </View>
  );
};

export { Register };
