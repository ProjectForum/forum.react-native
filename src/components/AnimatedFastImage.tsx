import * as React from 'react';
import FastImage, { FastImageProperties } from 'react-native-fast-image';
import { Animated, View, StyleProp, ViewStyle, FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import * as Animatable from 'react-native-animatable';

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
              useNativeDriver: true,
            }
          ).start();
        }}
        onError={() => {
          this.setState({
            opacity: new Animated.Value(0),
          });
        }}
      />
    );
  }
}

export interface IAvatarImageProps {
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
      <TouchableOpacity>
        <View style={[styles, { backgroundColor: '#eee' }, this.props.style]}>
          <AnimatedFastImage
            style={styles}
            source={{
              uri: this.props.source,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export type IFastImage = string;
export interface IFastImageListProps {
  images: IFastImage[];
  numColumns?: number;
  style?: StyleProp<ViewStyle>;
  subElement?: (info: ListRenderItemInfo<IFastImage>, getAnimatableView: () => Animatable.AnimatableComponent<{}, {}>) => React.ReactElement;
  onItemPress?: (info: ListRenderItemInfo<IFastImage>, event: GestureResponderEvent) => void;
}

interface IFastImageListState {
  itemHeight: number;
}

/**
 * 图片列表
 */
export class FastImageList extends React.Component<IFastImageListProps, IFastImageListState> {

  state: IFastImageListState = {
    itemHeight: 0,
  }

  renderItem(info: ListRenderItemInfo<IFastImage>): React.ReactElement {
    const height = this.state.itemHeight;
    let animatableView: Animatable.AnimatableComponent<{}, {}>;
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={(event) => this.props.onItemPress ? this.props.onItemPress(info, event) : null}
      >
        <Animatable.View
          ref={ref => animatableView = (ref as any)}
          style={[listStyles.image, { position: 'relative', backgroundColor: '#eee', }]}
        >
          <AnimatedFastImage
            style={[{ width: height, height, }]}
            source={{
              uri: info.item,
            }}
          />
          {this.props.subElement ? this.props.subElement(info, () => animatableView) : null}
        </Animatable.View>
      </TouchableOpacity>
    );
  }

  getNumColumns(): number {
    return this.props.numColumns ? this.props.numColumns : 4;
  }

  render() {
    return (
      <FlatList
        data={this.props.images}
        style={this.props.style}
        horizontal={false}
        numColumns={this.getNumColumns()}
        renderItem={this.renderItem.bind(this)}
        keyboardShouldPersistTaps='always'
        columnWrapperStyle={[
          listStyles.columnWrapper,
          { height: this.state.itemHeight },
        ]}
        onLayout={(e) => {
          const width = e.nativeEvent.layout.width - (this.getNumColumns() * 4);
          this.setState({
            itemHeight: width / this.getNumColumns(),
          });
        }}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={(data, index) => {
          const itemHeight = this.state.itemHeight;
          return { length: itemHeight, offset: itemHeight * index, index };
        }}
      />
    );
  }
}

const listStyles = StyleSheet.create({
  columnWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: -2,
    marginRight: -2,
    marginBottom: 4,
  },
  image: {
    marginLeft: 4,
    backgroundColor: '#eee',
  },
});
