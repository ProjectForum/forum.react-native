import * as React from 'react';
import { Platform } from 'react-native';
import { Spinner, Text } from 'native-base'
import { StyleSheet, View } from 'react-native';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

export interface ILoadingProps {
  visible: boolean;
  message?: string;
}

class Loading extends React.Component<ILoadingProps> {
  render(): React.ReactNode {
    // 安卓在一些机型上回出现overlay覆盖不全的情况
    const overlayColor = Platform.OS === 'android' ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.25)';
    // 自定义指示器
    const indicator = (
      <View style={styles.indicator}>
        <Spinner color='white' />
        <Text style={styles.message}>
          {this.props.message ? this.props.message : '正在加载'}
        </Text>
      </View>
    );
    /**
     * @HACK
     * SpinnerOverlay 的Types中不存在 customIndicator 属性  
     * @todo 给 @types/react-native-loading-spinner-overlay 提交个PR
     */
    let Overlay: any = SpinnerOverlay;
    return (
      <Overlay
        visible={this.props.visible}
        animation='fade'
        overlayColor={overlayColor}
        customIndicator={indicator}
      />
    )
  }
}

const styles = StyleSheet.create({
  indicator: {
    borderRadius: 5,
    minWidth: 125,
    backgroundColor: '#444',
  },
  message: {
    textAlign: 'center',
    marginTop: 0,
    marginBottom: 18,
    color: '#fff',
  },
});

export default Loading;
