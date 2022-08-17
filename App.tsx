import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthSelector } from 'stores/auth';

import { Login, Home, Register } from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
  const { isAuthenticated } = useAuthSelector();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          statusBarAnimation: 'slide',
          animation: 'slide_from_right',
        }}
      >
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
