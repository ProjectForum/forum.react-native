import * as React from 'react';
import FastImage, { FastImageProperties } from 'react-native-fast-image';
import { Animated, View, StyleProp, ViewStyle } from 'react-native';

interface IState {
  opacity: Animated.Value;
}

export class AnimatedFastImage extends React.PureComponent<FastImageProperties, IState> {
  state = {
    opacity: new Animated.Value(0),
  }

  render() {
    const AnimatedImage = Animated.createAnimatedComponent(FastImage);
    return (
      <AnimatedImage
        {...this.props}
        style={[{ opacity: this.state.opacity }, this.props.style]}
        onLoadEnd={() => {
          Animated.timing(
            this.state.opacity,
            {
              toValue: 1,
              duration: 200,
            }
          ).start();
        }}
      />
    );
  }
}

export interface IAvatarImageProps  {
  source: string;
  size: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * 头像 Image
 */
export class AvatarImage extends React.PureComponent<IAvatarImageProps> {
  render() {
    const styles = { width: this.props.size, height: this.props.size, borderRadius: this.props.size / 2 };
    return (
      <View style={[styles, { backgroundColor: '#eee' }, this.props.style]}>
        <AnimatedFastImage
          style={styles}
          source={{
            uri: this.props.source,
          }}
        />
      </View>
    );
  }
}
