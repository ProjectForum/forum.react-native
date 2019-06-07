import * as React from 'react';
import { Platform } from 'react-native';
import { Text } from 'native-base'
import { StyleSheet, View } from 'react-native';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import Spinner from 'react-native-spinkit';

export interface ILoadingProps {
  visible: boolean;
  message?: string;
}

class Loading extends React.Component<ILoadingProps> {
  render(): React.ReactNode {
    // 安卓在一些机型上回出现overlay覆盖不全的情况
    // const overlayColor = Platform.OS === 'android' ? 'rgba(0, 0, 0, 0)' : 'rgba(0, 0, 0, 0.25)';
    const overlayColor = 'rgba(255, 255, 255, 1)';
    // 自定义指示器
    const indicator = (
      <View>
        <Spinner type='Pulse' color='#bbb' size={40} />
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
        cancelable={true}
        visible={this.props.visible}
        animation='fade'
        overlayColor={overlayColor}
        customIndicator={indicator}
        style={{ marginTop: 20 }}
      />
    )
  }
}

const styles = StyleSheet.create({
  spinner: {
  }
});

export default Loading;
