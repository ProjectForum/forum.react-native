import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import { NavigationScreenOptions, ScrollView, SafeAreaView } from 'react-navigation'
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Container, Icon, Text, Button, ActionSheet } from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';
import ImagePicker, { Image as PickerImage } from 'react-native-image-crop-picker';
import { AnimatedFastImage, FastImageList } from '../../components';

interface IState {
  // 再弹起键盘时应该关闭安全区域显示
  safeAreaViewDisplay: boolean;
  images: string[];
  test: string,
}

class NewTopicScreen extends React.Component<{}, IState> {
  static navigationOptions = ({ navigation, screenProps }): NavigationScreenOptions => {
    return {
      title: '发表帖子',
    }
  }

  state: IState = {
    safeAreaViewDisplay: true,
    images: [],
    test: '',
  }

  addImage(image: PickerImage) {
    let images = this.state.images;
    images.push(image.path);
    this.setState({
      images,
    });
    console.log(this.state)
  }

  /**
   * 批量增加图片
   * @param images 
   */
  addImages(images: PickerImage[] | PickerImage) {
    if (Array.isArray(images)) {
      for (let image of images) {
        this.addImage(image);
      }
    } else {
      this.addImage(images);
    }
  }

  /**
   * 打开上传图片操作面板
   */
  openImageUploadActionSheet() {
    const focusTextarea = () => {
      (this.refs.textarea as any).focus();
    };
    ActionSheet.show(
      {
        options: ['拍摄', '从相册选择', '取消'],
        cancelButtonIndex: 2,
        title: '上传图片',
      },
      (index) => {
        if (index === 0) {
          ImagePicker.openCamera({
            width: 300,
            height: 400,
            includeBase64: true,
          }).then((image) => {
            this.addImages(image);
          }).catch((e) => {

          }).finally(() => {
            focusTextarea();
          });
        } else if (index === 1) {
          ImagePicker.openPicker({
            includeBase64: true,
            mediaType: 'photo',
            multiple: true,
          }).then((images) => {
            this.addImages(images);
          }).catch((e) => {

          }).finally(() => {
            focusTextarea();
          });
        }
      },
    );
  }

  render(): React.ReactNode {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps='always'>
          <TextInput ref='textarea' autoFocus style={styles.textarea} multiline={true} placeholder='说点什么吧...' />
          <FastImageList
            style={{ marginHorizontal: 15, }}
            images={this.state.images}
            numColumns={3}
            subElement={(info, animatableView) => (
              // 删除按钮
              <View style={styles.imageRemoveBox}>
                <Icon style={styles.imageRemoveIcon} type="AntDesign" name="close" onPress={() => {
                  let images = this.state.images;
                  images.splice(info.index, 1);
                  this.setState({
                    images,
                  });
                }} />
              </View>
            )}
          />
        </ScrollView>
        <Animatable.View style={{ left: 0, right: 0, }} animation='fadeInUp' duration={400} useNativeDriver>
          <Container style={styles.footerShadow}></Container>
          <Container style={styles.footer}>
            <TouchableOpacity style={styles.footerButton} onPress={this.openImageUploadActionSheet.bind(this)}>
              <Icon type='FontAwesome' name='image' style={{ fontSize: 20, color: '#888' }} />
              <Text style={{ fontSize: 14, marginLeft: 8, color: '#323232', }}>上传图片</Text>
            </TouchableOpacity>
          </Container>
        </Animatable.View>
        <KeyboardSpacer onToggle={(keyboardIsOpen) => {
          this.setState({
            safeAreaViewDisplay: !keyboardIsOpen,
          });
        }} />
        <SafeAreaView style={{ display: this.state.safeAreaViewDisplay ? 'flex' : 'none' }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  imageItem: {
    height: 150,
    flex: 0.33,
  },
  imageRemoveBox: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#aaa',
    borderBottomLeftRadius: 3,
  },
  imageRemoveIcon: {
    padding: 2,
    fontSize: 14,
    color: '#eee',
  },
  textarea: {
    padding: 16,
    fontSize: 16,
    minHeight: 120,
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
    height: 1,
  },
  footer: {
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 50,
    flex: 0,
    paddingHorizontal: 14,
  },
  footerButton: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
});

export default NewTopicScreen