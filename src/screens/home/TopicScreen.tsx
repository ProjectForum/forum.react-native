import * as React from 'react';
import { View, Text, Button, SafeAreaView, Modal } from 'react-native'
import { NavigationScreenOptions, NavigationBottomTabScreenOptions } from 'react-navigation'
import { AvatarImage, Loading } from '../../components';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-spinkit';

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
    }, 500)
  }

  render(): React.ReactNode {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
          <Spinner type='Pulse' color='#bbb' size={40} />
        </View>
      );
    }

    return (
      <SafeAreaView>
        <Animatable.View animation='fadeIn'>
          <View>
            <Button title="Dark" onPress={() => { }}></Button>
          </View>
        </Animatable.View>
      </SafeAreaView>
    )
  }
}

export default TopicScreen
