import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthSelector } from 'stores/auth';
import * as SCREEN_NAMES from 'utils/constants';

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
        {isAuthenticated ?? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ animation: 'none' }}
          />
        )}
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={Home} />
        ) : (
          <>
            <Stack.Screen
              name={SCREEN_NAMES.LOGIN}
              component={Login}
              options={{ headerShown: false, animation: 'fade_from_bottom' }}
            />
            <Stack.Screen
              name={SCREEN_NAMES.REGISTER}
              component={Register}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
