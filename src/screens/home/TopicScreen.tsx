import * as React from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native'
import { NavigationScreenOptions, NavigationBottomTabScreenOptions } from 'react-navigation'
import { AvatarImage, Loading } from '../../components';

interface IState {
  loading: boolean;
}

class TopicScreen extends React.Component<{}, IState> {
  static navigationOptions = ({ navigation, screenProps }): NavigationScreenOptions => {
    return {
      title: '帖子正文',
    }
  }

  state = {
    loading: true,
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 2000)
  }

  render(): React.ReactNode {
    return (
      <SafeAreaView>
        <Loading visible={this.state.loading} />
        <View>
          <Button title="Dark" onPress={() => { }}></Button>
        </View>
      </SafeAreaView>
    )
  }
}

export default TopicScreen
