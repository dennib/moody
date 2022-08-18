import { Button } from 'components';
import { StatusBar } from 'expo-status-bar';
import { globalStyles } from 'globalStyles';
import { ScrollView, Text, View } from 'react-native';
import { BasePageProps } from 'screens/RootStackParams';
import { useAuthSelector } from 'stores/auth';

import { homeStyles } from './Home.styles';

const Home = ({ navigation }: BasePageProps<'Home'>) => {
  const { user } = useAuthSelector();
  console.log('🚀 ~ file: Home.tsx ~ line 9 ~ Home ~ user', user);

  // const fetchMoods = async () => {
  //   const rawMoods = await getDocs(collection(db, 'moods'));
  //   const moods: any[] = [];
  //   rawMoods.forEach(doc =>
  //     moods.push(doc.data())
  //   );
  //   setMoods(moods);
  // };

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
            <Text>How are you today?</Text>
            <Button
              text="Tell me ->"
              onPress={() => navigation.navigate('MoodChoose')}
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};

export { Home };
