import { Button } from 'components';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text } from 'react-native';
import { useAuthSelector } from 'stores/auth';

import { homeStyles } from './Home.styles';

const Home = () => {
  const { user, handleLogout } = useAuthSelector();

  // const fetchMoods = async () => {
  //   const rawMoods = await getDocs(collection(db, 'moods'));
  //   const moods: any[] = [];
  //   rawMoods.forEach(doc =>
  //     moods.push(doc.data())
  //   );
  //   setMoods(moods);
  // };

  return (
    <ScrollView contentContainerStyle={homeStyles.container}>
      <StatusBar style="auto" />
      <Text>Homepage</Text>

      {user && (
        <>
          <Text>{user.displayName}</Text>
          <Text>{user.email}</Text>
        </>
      )}

      <Button text="Sign Out" onPress={handleLogout} />
    </ScrollView>
  );
};

export { Home };
