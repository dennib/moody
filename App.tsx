import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthSelector } from 'stores/auth';

import { Login, Home } from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
  const { isAuthenticated } = useAuthSelector();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
