import { Modal, View, Alert } from 'react-native';
import * as React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type';
import { ActionSheet, Container, Button, Text, Spinner } from 'native-base';
import { Loading } from '../../components';

const images: IImageInfo[] = [{
  // Simplest usage.
  url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

  // width: number
  // height: number
  // Optional, if you know the image size, you can set the optimization performance

  // You can pass props to <Image />.
  props: {
    // headers: ...
  }
}]

export default class App extends React.Component {
  state = {
    show: false,
  }
  onMenus({ cancel, saveToLocal }) {
    ActionSheet.show(
      {
        options: ["保存图片", "取消"],
        cancelButtonIndex: 1,
        title: '选择操作',
      },
      (index) => {
        if (index === 0) {
          saveToLocal();
        } else {
          cancel();
        }
      },
    );
    return <View></View>;
  }
  render() {
    return (
      <Container>
        <Loading visible={this.state.show} />
        <Button>
          <Text onPress={() => {
            this.setState({ show: true })
            setTimeout(() => this.setState({ show: false }), 2000)
          }}>Test</Text>
        </Button>
        {/* <Modal visible={this.state.show} transparent={true} animationType='fade'>
          <ImageViewer
            imageUrls={images}
            menus={this.onMenus}
            enableSwipeDown={true}
            swipeDownThreshold={200}
            pageAnimateTime={300}
            loadingRender={() => (
              <Spinner />
            )}
            onSwipeDown={() => this.setState({ show: false })}
            onClick={() => this.setState({ show: false })} />
        </Modal> */}
      </Container>
    )
  }
}