import { Button } from 'components';
import { globalStyles } from 'globalStyles';
import { useDB } from 'hooks';
import { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { BasePageProps } from 'screens/RootStackParams';
import { Moods } from 'types/mood';
import { chooseMoodStyles } from './ChooseMood.styles';

const ChooseMood = ({ navigation }: BasePageProps<'MoodChoose'>) => {
  const { saveMood, getTodayMood } = useDB();

  const [selectedMood, setSelectedMood] = useState<Moods | null>(null);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    fetchMood();
    const unsubscribe = navigation.addListener('focus', fetchMood);
    return unsubscribe;
  }, [navigation]);

  const fetchMood = () =>
    getTodayMood().then(mood => {
      if (!mood) return;
      setSelectedMood(mood.value);
      setMessage(mood.message || '');
    });

  const handleMood = async () => {
    if (Number.isNaN(selectedMood)) return;
    await saveMood(selectedMood as number, message);
    navigation.navigate('Home');
  };

  return (
    <View style={globalStyles.container}>
      <Text>How are you feeling today?</Text>

      <View style={chooseMoodStyles.actionsWrapper}>
        <Button text="Great" onPress={() => setSelectedMood(Moods.GREAT)} />
        <Button text="So so" onPress={() => setSelectedMood(Moods.AVERAGE)} />
        <Button text="Bad" onPress={() => setSelectedMood(Moods.BAD)} />
      </View>

      <Text style={chooseMoodStyles.selectedMood}>
        {selectedMood !== null ? Moods[selectedMood] : ''}
      </Text>
      <TextInput
        style={chooseMoodStyles.messageInput}
        onChangeText={setMessage}
        value={message}
        placeholder="Leave a message for today..."
      ></TextInput>
      <Button text="Save Mood" onPress={handleMood} />
    </View>
  );
};

export { ChooseMood };
