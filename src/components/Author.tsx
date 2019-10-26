import * as React from 'react';
import { Thumbnail, Text, View, Button } from 'native-base';
import { TouchableHighlight, StyleSheet, GestureResponderEvent } from 'react-native';
import { AvatarImage } from '.';
import { Theme } from '../utils';

export interface IAuthorProps {
  faceUrl: string;
  name: string;
  info: string;
  onPress?: (event: GestureResponderEvent) => void;
}

class Author extends React.PureComponent<IAuthorProps> {
  render() {
    const faceUrl = 'https://facebook.github.io/react-native/docs/assets/favicon.png';

    return (
      <View style={styles.authorBox}>
        {/* 头像 */}
        <View style={{ flexDirection: 'row' }}>
          <AvatarImage
            size={35}
            source={this.props.faceUrl}
            style={{ alignSelf: 'center' }}
          />
        </View>
        {/* 作者信息 */}
        <View style={styles.authorInfo}>
          <View>
            <Text style={styles.authorNameText}>{this.props.name}</Text>
          </View>
          <View style={styles.author}>
            <Text style={styles.authorText}>{this.props.info}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = Theme.createStyle({
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
    color: '$titleColor',
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
});

export default Author;
