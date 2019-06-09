import * as React from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native'
import { NavigationScreenOptions, NavigationBottomTabScreenOptions } from 'react-navigation'
import { AvatarImage, Loading } from '../../components';

class BoardListScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }): NavigationScreenOptions => {
    return {
      title: '板块',
    };
  }

  render(): React.ReactNode {
    return (
      <SafeAreaView>
        <View>
          <Button title="Dark" onPress={() => { }}></Button>
        </View>
      </SafeAreaView>
    )
  }
}

export default BoardListScreen
