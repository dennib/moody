import { ReactNode } from 'react';

export interface IButtonProps {
  children?: ReactNode;
  onPress: () => void;
  text: string;
}
