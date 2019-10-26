import * as React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Alert, Platform, Button as NativeButton, Keyboard } from 'react-native'
import { ScrollView, SafeAreaView, NavigationScreenConfig } from 'react-navigation'
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Container, Icon, Text, Button, ActionSheet } from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';
import ImagePicker, { Image as PickerImage } from 'react-native-image-crop-picker';
import { AnimatedFastImage, FastImageList, ImageViewer } from '../../components';
import { IImageInfo } from 'react-native-image-zoom-viewer/built/image-viewer.type';
import { Theme } from '../../utils';
import { NavigationStackOptions, NavigationStackScreenProps } from 'react-navigation-stack';

interface IState {
  // 再弹起键盘时应该关闭安全区域显示
  safeAreaViewDisplay: boolean;
  images: string[];
  showImageViewer: boolean;
  imageViewIndex: number;
}

class NewTopicScreen extends React.Component<NavigationStackScreenProps<{}>, IState> {
  static navigationOptions = ({ navigation, screenProps }): NavigationStackOptions => {
    return {
      title: '发表帖子',
      headerRight: (
        <Button transparent style={{ alignSelf: 'center', }} onPress={navigation.getParam('submit')}>
          <Text>发布</Text>
        </Button>
      )
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({
      submit: this.submit,
    });
  }

  state: IState = {
    safeAreaViewDisplay: true,
    images: [],
    showImageViewer: false,
    imageViewIndex: 0,
  }

  addImage(image: PickerImage) {
    let images = this.state.images;
    images.push(image.path);
    this.setState({
      images,
    });
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
    Keyboard.dismiss();
    ActionSheet.show(
      {
        options: ['拍摄', '从相册选择', '取消'],
        cancelButtonIndex: 2,
        title: '上传图片',
      },
      (index) => {
        if (index === 0) {
          ImagePicker.openCamera({
            // width: 300,
            // height: 400,
            includeBase64: true,
          }).then((image) => {
            this.addImages(image);
          }).catch((e) => {
            Alert.alert(e.message);
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
            console.error(e);
          }).finally(() => {
            focusTextarea();
          });
        } else {
          focusTextarea();
        }
      },
    );
  }

  submit() {
    Alert.alert('test');
  }

  render(): React.ReactNode {
    return (
      <View style={{ flex: 1 }}>
        <ImageViewer
          visible={this.state.showImageViewer}
          onCancel={() => this.setState({ showImageViewer: false, })}
          index={this.state.imageViewIndex}
          images={this.state.images.map((item): IImageInfo => ({
            url: item,
          }))}
        />
        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps='always'>
          <View>
            <TextInput
              autoFocus
              style={styles.titleTextInput}
              placeholder='帖子标题'
              placeholderTextColor='#aaa'
            />
          </View>
          <View style={{ minHeight: 120, }}>
            <TextInput
              ref='textarea'
              style={styles.textarea}
              multiline={true}
              placeholder='说点什么吧...'
              placeholderTextColor='#aaa'
            />
          </View>
          <FastImageList
            style={{ marginHorizontal: 15, }}
            images={this.state.images}
            numColumns={3}
            onItemPress={(info) => {
              this.setState({
                showImageViewer: true,
                imageViewIndex: info.index,
              });
            }}
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
        {
          Platform.OS === 'ios' ? <KeyboardSpacer onToggle={(keyboardIsOpen) => {
            this.setState({
              safeAreaViewDisplay: !keyboardIsOpen,
            });
          }} /> : null
        }
        <SafeAreaView style={{ display: this.state.safeAreaViewDisplay ? 'flex' : 'none' }} />
      </View>
    )
  }
}

const styles = Theme.createStyle({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '$backgroundColor',
  },
  scrollView: {
    backgroundColor: '$backgroundColor',
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
  titleTextInput: {
    padding: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '$titleColor',
  },
  textarea: {
    padding: 16,
    fontSize: 16,
    color: '$titleColor',
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
    elevation: 10,
  },
  footerButton: {
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
});

export default NewTopicScreen
