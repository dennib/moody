import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'components';
import { LogBox } from 'react-native';
import { useAuthSelector } from 'stores/auth';
import * as SCREEN_NAMES from 'utils/constants';

import * as SCREENS from './screens';

const Stack = createNativeStackNavigator();

export default function App() {
  const { isAuthenticated, handleLogout } = useAuthSelector();
  LogBox.ignoreLogs(['timer']);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          statusBarAnimation: 'slide',
          animation: 'slide_from_right',
          headerRight: () => <Button text="Log out" onPress={handleLogout} />,
        }}
      >
        {isAuthenticated ?? (
          <Stack.Screen
            name={SCREEN_NAMES.HOME}
            component={SCREENS.Home}
            options={{ animation: 'none' }}
          />
        )}
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={SCREENS.Home} />
            <Stack.Screen
              name={SCREEN_NAMES.MOOD_CHOOSE}
              component={SCREENS.ChooseMood}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={SCREEN_NAMES.LOGIN}
              component={SCREENS.Login}
              options={{ headerShown: false, animation: 'fade_from_bottom' }}
            />
            <Stack.Screen
              name={SCREEN_NAMES.REGISTER}
              component={SCREENS.Register}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
