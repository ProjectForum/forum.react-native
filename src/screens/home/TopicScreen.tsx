import * as React from 'react';
import { View, SafeAreaView, TouchableHighlight, TouchableOpacity, TextInput, Platform, Animated, Keyboard } from 'react-native'
import { ScrollView, SectionList } from 'react-navigation'
import { AvatarImage, Loading, Author, } from '../../components';
import { Theme } from '../../utils';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-spinkit';
import ParsedText from 'react-native-parsed-text';
import { NavigationStackOptions } from 'react-navigation-stack';
import { Container, Button, Text, ActionSheet } from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';

interface IState {
  loading: boolean;
  keyboradShow: boolean;
  safeAreaShow: boolean;
  textareaHeight: Animated.Value;
  commentText: string;
  commentInputPlaceholder: string;
}

class TopicScreen extends React.Component<{}, IState> {
  static navigationOptions = ({ navigation, screenProps }): NavigationStackOptions => {
    return {
      title: '帖子正文',
    }
  }

  state = {
    loading: true,
    safeAreaShow: true,
    textareaHeight: new Animated.Value(50),
    keyboradShow: false,
    commentText: '',
    commentInputPlaceholder: '写回复',
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 500)

    // 设置键盘监听器
    const onKeyboradShow = () => {
      this.setState({ keyboradShow: true });
      this.calcCommentInputHeight();
    };
    const onKeyboradHide = () => {
      this.setState({ keyboradShow: false });
      Animated.timing(
        this.state.textareaHeight,
        {
          duration: 100,
          toValue: 50,
        }
      ).start();
    }

    Keyboard.addListener('keyboardWillShow', onKeyboradShow);
    Keyboard.addListener('keyboardDidShow', onKeyboradShow);
    Keyboard.addListener('keyboardWillHide', onKeyboradHide);
    Keyboard.addListener('keyboardDidHide', onKeyboradHide);
  }

  calcCommentInputHeight() {
    let textareaHeight = 50;
    let brMatch = this.state.commentText.match(/\n/g);
    if (brMatch != null) {
      let lines = brMatch.length;
      if (lines > 5) {
        lines = 5;
      }
      textareaHeight = 50 + lines * 18;
    }
    // 变动底部栏高度
    Animated.timing(
      this.state.textareaHeight,
      {
        duration: 100,
        toValue: textareaHeight,
      }
    ).start();
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

    // 渲染帖子内容
    const renderTopic = () => (
      <View style={styles.topic}>
        <Author name='测试' faceUrl={faceUrl} info='发布于 05-01' />
        <View style={styles.topicInfo}>
          <Text selectable style={styles.topicTitleText}>问下法师的随从怎么搭配装备的，怎么选技能的，这样的装备咋选啊？</Text>
          <ParsedText
            selectable
            style={styles.topicContentText}
          >
            {text}
          </ParsedText>
        </View>
      </View>
    );

    // 渲染间隙
    const renderGap = () => (
      <View>
        <View style={styles.gap} />
        <View style={styles.commentsTitle}>
          <Text style={styles.commentsTitleText}>全部回复</Text>
        </View>
      </View>
    );

    // 渲染评论列表
    const renderComment = () => (
      <TouchableHighlight
        activeOpacity={0.92}
        onPress={() => {
          (this.refs.commentInput as any).focus();
          this.setState({
            commentInputPlaceholder: '回复 测试：',
          });
        }}
        onLongPress={() => {
          ActionSheet.show(
            {
              options: ['复制评论', '取消'],
              cancelButtonIndex: 1,
              title: '操作',
            },
            (index) => {}
          );
        }}
      >
        <View style={styles.comment}>
          <Author name='测试' faceUrl={faceUrl} info='发布于 05-01' />
          <ParsedText
            style={styles.commentText}
          >
            问下法师的随从怎么搭配装备的，怎么选技能的，这样的装备咋选啊？
          </ParsedText>
        </View>
      </TouchableHighlight>
    );

    return (
      <View style={styles.background}>
        <View style={styles.container}>
          <Animatable.View animation='fadeIn' style={styles.container}>
            <SectionList
              keyExtractor={(item, index) => index.toString()}
              sections={[
                { key: 'topic', data: [0], renderItem: renderTopic },
                { key: 'gap', data: [0], renderItem: renderGap },
                { key: 'comments', data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], renderItem: renderComment }
              ]}
            />
            {/* 底部控制栏 */}
            <Animatable.View style={{ left: 0, right: 0, }} animation='fadeInUp' duration={400} useNativeDriver>
              <Animated.View style={[styles.footer, { height: this.state.textareaHeight }]}>
                <TouchableOpacity style={styles.footerButton} onPress={() => { }}>
                  <TextInput
                    ref='commentInput'
                    style={{ ...styles.commentInput, maxHeight: this.state.keyboradShow ? 125 : 30, }}
                    multiline={true}
                    placeholder={this.state.commentInputPlaceholder}
                    placeholderTextColor='#ccc'
                    onChangeText={(text) => {
                      this.setState({
                        commentText: text,
                      }, () => {
                        this.calcCommentInputHeight();
                      });
                    }}
                  />
                </TouchableOpacity>
              </Animated.View>
              {
                this.state.keyboradShow ?
                  <View style={styles.footerButtons}>
                    <View style={{ marginRight: 15, }}>
                      <Button bordered info small>
                        <Text>发布</Text>
                      </Button>
                    </View>
                  </View>
                  : null
              }
            </Animatable.View>
            {
              Platform.OS === 'ios' ? <KeyboardSpacer onToggle={(keyboardIsOpen) => {
                this.setState({
                  safeAreaShow: !keyboardIsOpen,
                });
              }} /> : null
            }
          </Animatable.View>
        </View>
        <SafeAreaView style={{ display: this.state.safeAreaShow ? 'flex' : 'none' }} />
      </View>
    );
  }
}

const styles = Theme.createStyle({
  background: {
    backgroundColor: '$bottomBarColor',
    flex: 1,
  },
  container: {
    backgroundColor: '$backgroundColor',
    flex: 1,
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
  commentsTitle: {
    padding: 15,
  },
  commentsTitleText: {
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
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: '$borderLineColor',
    backgroundColor: '$backgroundColor',
  },
  footerShadow: {
    flexDirection: 'row',
    flex: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.00,
    backgroundColor: '$bottomBarColor',
    height: 1,
  },
  footer: {
    backgroundColor: '$bottomBarColor',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flex: 0,
    paddingHorizontal: 14,
  },
  footerButtons: {
    backgroundColor: '$bottomBarColor',
    flexDirection: 'row-reverse',
    paddingBottom: 10,
  },
  footerButton: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  commentInput: {
    borderRadius: 10,
    backgroundColor: '$bottomInputBackgroundColor',
    color: '$titleColor',
    fontSize: 15,
    padding: 10,
    paddingTop: 6,
    paddingBottom: 6,
    flex: 1,
  },
});

export default TopicScreen
