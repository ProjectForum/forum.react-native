import * as React from 'react';
import { View, Text, Button, SafeAreaView, Modal, StyleSheet } from 'react-native'
import { NavigationScreenOptions, NavigationBottomTabScreenOptions, ScrollView } from 'react-navigation'
import { AvatarImage, Loading, Author, } from '../../components';
import { Theme } from '../../utils';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-spinkit';
import EStyleSheet from 'react-native-extended-stylesheet';
import ParsedText from 'react-native-parsed-text';

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
    const faceUrl = 'https://facebook.github.io/react-native/docs/assets/favicon.png';
    if (this.state.loading) {
      return (
        <View style={styles.loadingView}>
          <Spinner type='Pulse' color='#bbb' size={40} />
        </View>
      );
    }

    const text = 'Test\nHello World!';

    return (
      <ScrollView style={styles.scrollView}>
        <SafeAreaView>
          <Animatable.View animation='fadeIn'>
            <View style={styles.topic}>
              <Author name='测试' faceUrl={faceUrl} info='发布于 05-01' />
              <View style={styles.topicInfo}>
                <Text style={styles.topicTitleText}>问下法师的随从怎么搭配装备的，怎么选技能的，这样的装备咋选啊？</Text>
                <ParsedText
                  style={styles.topicContentText}
                >
                  {text}
                </ParsedText>
              </View>
            </View>
          </Animatable.View>
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const styles = Theme.createStyle({
  scrollView: {
    backgroundColor: '$backgroundColor',
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$backgroundColor',
  },
  topic: {
    padding: 15,
  },
  topicInfo: {
    marginTop: 20,
  },
  topicTitleText: {
    lineHeight: 25,
    fontSize: 20,
    fontWeight: 'bold',
    color: '$titleColor',
  },
  topicContentText: {
    color: '$titleColor',
    marginTop: 16,
    fontSize: 17,
  },
});

export default TopicScreen
