import { Button } from 'components';
import { StatusBar } from 'expo-status-bar';
import { globalStyles } from 'globalStyles';
import { useDB } from 'hooks';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { BasePageProps } from 'screens/RootStackParams';
import { useAuthStore } from 'stores/auth';
import { IMood, Moods } from 'types/mood';

import { homeStyles } from './Home.styles';

const Home = ({ navigation }: BasePageProps<'Home'>) => {
  const user = useAuthStore(state => state.user);
  const { getTodayMood } = useDB();

  const [mood, setMood] = useState<IMood | undefined>();

  useEffect(() => {
    fetchMood();
    const unsubscribe = navigation.addListener('focus', fetchMood);
    return unsubscribe;
  }, [navigation, user]);

  const fetchMood = () => user && getTodayMood().then(setMood);

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <StatusBar style="auto" />

      {user && (
        <>
          <View style={homeStyles.greetings}>
            <Text>Hi {user.displayName}!</Text>
            <Text>({user.email})</Text>
          </View>

          <View style={homeStyles.actions}>
            {!mood ? (
              <>
                <Text>How are you today?</Text>
                <Button
                  text="Tell me"
                  onPress={() => navigation.navigate('MoodChoose')}
                />
              </>
            ) : (
              <>
                <Text>
                  Mood for today already selected {`${Moods[mood?.value]}`}
                </Text>
                <Button
                  text="Change mood"
                  onPress={() => navigation.navigate('MoodChoose')}
                />
              </>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export { Home };
