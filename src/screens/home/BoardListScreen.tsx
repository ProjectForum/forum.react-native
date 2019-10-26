import * as React from 'react';
import { View, SafeAreaView } from 'react-native'
import { Theme } from '../../utils';
import { NavigationStackOptions } from 'react-navigation-stack';

class BoardListScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }): NavigationStackOptions => {
    return {
      title: '板块',
    };
  }

  render(): React.ReactNode {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          {/* <Button title="Dark" onPress={() => { }}></Button> */}
        </View>
      </SafeAreaView>
    )
  }
}

const styles = Theme.createStyle({
  container: {
    flex: 1,
    backgroundColor: '$backgroundColor',
  },
});

export default BoardListScreen
