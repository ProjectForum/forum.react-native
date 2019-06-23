import * as React from 'react';
import { Thumbnail, Text, View, Button } from 'native-base';
import { TouchableHighlight, StyleSheet, GestureResponderEvent } from 'react-native';
import { Author } from '.';
import { Theme } from '../utils';

export interface ITopicCardProps {
  onPress?: (event: GestureResponderEvent) => void;
}

class TopicCard extends React.PureComponent<ITopicCardProps> {
  render() {
    const faceUrl = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

    const infoColor = '#777';
    const cardMode = (
      <View style={cardStyles.card}>
        <TouchableHighlight activeOpacity={0.96} onPress={this.props.onPress}>
          <View style={cardStyles.container}>
            {/* 用户 */}
            <Author faceUrl={faceUrl} name='璨测试' info='发布于 5-24' />

            {/* 帖子信息 */}
            <View style={cardStyles.topicBox}>
              <Text style={cardStyles.topicTitleText}>问下法师的随从怎么搭配装备的，怎么选技能的，这样的装备咋选啊？</Text>
              <View style={{ marginTop: 8 }}>
                <Text style={cardStyles.topicContentText}>新版的 Pixel Launcher 终于对应用图标进行了进一步处理，对于非圆形的图标直接加上了白色底盘，对于强迫症来说再也不用忍受那些毫无追求的国内 APP 杂乱无章的图标了（从这一点上说，支付宝真的是阿里良心了）。</Text>
              </View>
            </View>

            {/* 板块信息、标签 */}
            <View style={cardStyles.infoContainer}>
              <Text style={cardStyles.infoBoardText}>综合版</Text>
              <Text style={cardStyles.infoText}>11 评论</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );

    return cardMode;
  }
}

const cardStyles = Theme.createStyle({
  card: {
    display: 'flex',
    backgroundColor: '$cardGapColor',
    paddingBottom: 8,
  },
  container: {
    backgroundColor: '$backgroundColor',
    padding: 15,
  },
  authorBox: {
    flexDirection: 'row',
  },
  authorInfo: {
    marginLeft: 15,
    paddingTop: 1,
  },
  authorNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#323232',
  },
  author: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    fontSize: 13,
    color: '#aaa',
  },
  topicBox: {
    marginTop: 15,
  },
  topicTitleText: {
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 23,
    color: '$titleColor',
  },
  topicContentText: {
    fontSize: 14,
    lineHeight: 20,
    color: '$titleColor',
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  infoBoardText: {
    color: '#eb4f32',
    fontSize: 13,
    marginRight: 10,
  },
  infoText: {
    color: '#aaa',
    fontSize: 13,
  },
});

export default TopicCard;
