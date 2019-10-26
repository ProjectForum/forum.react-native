import * as React from 'react';
import { View, Text, Button, SafeAreaView, TouchableHighlight } from 'react-native'
import { ScrollView } from 'react-navigation'
import { AvatarImage, Loading, Author, } from '../../components';
import { Theme } from '../../utils';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-spinkit';
import EStyleSheet from 'react-native-extended-stylesheet';
import ParsedText from 'react-native-parsed-text';
import { NavigationStackOptions } from 'react-navigation-stack';
import { FlatList } from 'react-native-gesture-handler';

interface IState {
  loading: boolean;
}

class TopicScreen extends React.Component<{}, IState> {
  static navigationOptions = ({ navigation, screenProps }): NavigationStackOptions => {
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
            <View style={styles.gap}></View>
            <View style={styles.comments}>
              <View>
                <Text style={styles.commentsTitle}>全部回复</Text>
              </View>
              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item, index }) => (
                  <TouchableHighlight activeOpacity={0.96} onPress={() => { }}>
                    <View style={styles.comment}>
                      <Author name='测试' faceUrl={faceUrl} info='发布于 05-01' />
                      <ParsedText
                        style={styles.commentText}
                      >
                        问下法师的随从怎么搭配装备的，怎么选技能的，这样的装备咋选啊？
                    </ParsedText>
                    </View>
                  </TouchableHighlight>
                )}
              />
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
    paddingBottom: 25,
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
  gap: {
    height: 8,
    backgroundColor: '$cardGapColor',
  },
  comments: {
    padding: 15,
  },
  commentsTitle: {
    paddingBottom: 10,
    color: '$titleColor',
  },
  commentText: {
    color: '$titleColor',
    fontSize: 15,
    lineHeight: 21,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 10,
  },
  comment: {
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: '$borderLineColor',
    backgroundColor: '$backgroundColor',
  },
});

export default TopicScreen
