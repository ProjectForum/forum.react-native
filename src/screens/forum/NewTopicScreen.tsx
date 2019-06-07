import * as React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, StatusBar } from 'react-native'
import { NavigationScreenOptions, NavigationBottomTabScreenOptions, ScrollView, SafeAreaView } from 'react-navigation'
import { TextInput } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Container, Icon, Text, Button } from 'native-base';

class NewTopicScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }): NavigationScreenOptions => {
    return {
      title: '发表帖子',
    }
  }
  render(): React.ReactNode {
    const keyboardVerticalOffset = Platform.OS === 'ios' ? getStatusBarHeight() + 48 : getStatusBarHeight() + 52
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <KeyboardAvoidingView style={styles.container} behavior='height' keyboardVerticalOffset={keyboardVerticalOffset}>
          <ScrollView>
            <TextInput multiline={true} />
            <Text>1</Text>
          </ScrollView>
          <Container style={styles.footerShadow}></Container>
          <Container style={styles.footer}>
            <Icon type='FontAwesome' name='image' style={{ fontSize: 24 }} />
            <Text style={{ fontSize: 16, marginLeft: 5 }}>上传图片</Text>

          </Container>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
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
    elevation: 12,
    paddingHorizontal: 14,
  },
});

export default NewTopicScreen
