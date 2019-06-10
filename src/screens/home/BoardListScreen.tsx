import * as React from 'react';
import { View, SafeAreaView } from 'react-native'
import { NavigationScreenOptions } from 'react-navigation'

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
          {/* <Button title="Dark" onPress={() => { }}></Button> */}
        </View>
      </SafeAreaView>
    )
  }
}

export default BoardListScreen
