import { Alert } from 'react-native';

class SimpleAlert {
  static error(message: string, onPress: () => void = () => { }): void {
    Alert.alert(
      '错误',
      message,
      [
        {
          text: '确定',
          onPress,
        }
      ],
      {
        cancelable: false,
      }
    );
  }
}

export default SimpleAlert;
