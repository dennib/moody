import { Button } from 'components';
import { format, isToday } from 'date-fns';
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
  const { getRecentMoods } = useDB();

  const [mood, setMood] = useState<IMood | undefined>();
  const [recentMoods, setRecentMoods] = useState<IMood[]>([]);

  useEffect(() => {
    fetchRecentMoods();
    const unsubscribe = navigation.addListener('focus', () => {
      fetchRecentMoods();
    });
    return unsubscribe;
  }, [navigation, user]);

  const fetchRecentMoods = () =>
    user &&
    getRecentMoods().then(moods => {
      if (!moods) return;
      const todayMood = moods.find(mood => isToday(mood.date));
      const otherMoods = moods.filter(mood => !isToday(mood.date));
      setRecentMoods(otherMoods);
      setMood(todayMood);
    });

  return (
    <ScrollView contentContainerStyle={globalStyles.container}>
      <StatusBar style="auto" />

      {user && (
        <>
          <View style={homeStyles.greetings}>
            <Text>Hi {user.displayName}!</Text>
            <Text>({user.email})</Text>

            <View style={homeStyles.recentMoods}>
              {recentMoods.length > 0 && (
                <>
                  <Text style={{ fontWeight: 'bold' }}>Recent moods</Text>
                  {recentMoods.map(({ date, value }) => (
                    <Text key={date.toISOString()}>
                      {`${format(date, 'EEE, dd MMM')}: ${Moods[value]}`}
                    </Text>
                  ))}
                </>
              )}
            </View>
          </View>

          <View style={homeStyles.actions}>
            <Text>{format(new Date(), 'EEEE, dd MMMM yyyy')}</Text>
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
