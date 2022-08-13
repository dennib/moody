import { Button as RNButton, View } from 'react-native';

import { styles } from './Button.styles';
import { IButtonProps } from './Button.types';

const Button = ({ onPress, text }: IButtonProps) => {
  return (
    <View style={styles.wrapper}>
      <RNButton title={text} onPress={onPress} />
    </View>
  );
};

export default Button;
