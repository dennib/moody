import { Button } from 'components';
import { globalStyles } from 'globalStyles';
import { Alert, Text, View } from 'react-native';
import { BasePageProps } from 'screens/RootStackParams';
import { Moods } from 'types/mood';
import { chooseMoodStyles } from './ChooseMood.styles';

const ChooseMood = ({ navigation }: BasePageProps<'MoodChoose'>) => {
  const handleMood = (mood: Moods) => {
    Alert.alert(`Mood chosen!`, `${Moods[mood]}`, [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Home'),
      },
    ]);
  };

  return (
    <View style={globalStyles.container}>
      <Text>How are you feeling today?</Text>
      <View style={chooseMoodStyles.actionsWrapper}>
        <Button text="Great" onPress={() => handleMood(1)} />
        <Button text="So so" onPress={() => handleMood(0)} />
        <Button text="Bad" onPress={() => handleMood(-1)} />
      </View>
    </View>
  );
};

export { ChooseMood };