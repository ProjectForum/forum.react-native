import * as React from 'react';
import ImageZoomViewer from 'react-native-image-zoom-viewer';
import { Modal, View } from 'react-native';
import { Spinner, ActionSheet } from 'native-base';
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type';

export interface IImageViewerProps {
  images: IImageInfo[];
  visible: boolean;
  menuVisible?: boolean;
  index?: number;
  onCancel: () => void;
}

interface IState { }

export default class ImageViewer extends React.PureComponent<IImageViewerProps, IState> {
  state = {
    show: false,
  }

  onMenus({ cancel, saveToLocal }) {
    console.log(this);
    if (this.props.menuVisible) {
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
    } else {
      cancel();
    }
    return <View></View>;
  }

  render() {
    return (
      <Modal visible={this.props.visible} transparent={true} animationType='fade'>
        <ImageZoomViewer
          imageUrls={this.props.images}
          menus={this.onMenus.bind(this)}
          index={this.props.index}
          enableSwipeDown={true}
          swipeDownThreshold={200}
          pageAnimateTime={300}
          loadingRender={() => (
            <Spinner />
          )}
          onClick={this.props.onCancel}
          onCancel={this.props.onCancel}
        />
      </Modal>
    );
  }
}
