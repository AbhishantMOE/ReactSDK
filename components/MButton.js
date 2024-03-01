import {Button} from 'react-native';

export const MButton = ({name,onPressButton}) => {
  return (
    <Button onPress={onPressButton}  title={name} color="#841584" />
  );
};
