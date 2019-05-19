import * as React from 'react';
import { Container, Button, Text, Form, Item, Input } from 'native-base'
import { NavigationScreenOptions } from 'react-navigation'
import { StyleSheet } from 'react-native';
import { Loading } from '../../components';

interface IState {
  loading: boolean;
}

class UserScreen extends React.Component<{}, IState> {
  static navigationOptions = ({ navigation, screenProps }): NavigationScreenOptions => {
    return {
      title: '登录'
    }
  }

  state: IState = {
    loading: false,
  };

  componentWillMount () {
    this.submit = this.submit.bind(this);
  };

  submit () {
    this.setState({
      loading: true,
    });
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 3000);
  };

  render(): React.ReactNode {
    return (
      <Container>
        <Loading visible={this.state.loading} />
        <Form>
          <Item>
            <Input placeholder='用户名' />
          </Item>
          <Item last>
            <Input placeholder='密码' secureTextEntry ref='test' />
          </Item>
        </Form>
        <Button block style={styles.loginButton} onPress={this.submit}>
          <Text>登录</Text>
        </Button>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default UserScreen
