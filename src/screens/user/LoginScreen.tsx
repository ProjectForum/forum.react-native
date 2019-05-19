import * as React from 'react';
import { Container, Button, Text, Form, Item, Input } from 'native-base'
import { NavigationScreenOptions } from 'react-navigation'
import { StyleSheet, Alert } from 'react-native';
import { Loading } from '../../components';
import { UserService, ResponseError } from '../../services';
import { SimpleAlert, Storage } from '../../utils';

interface IState {
  loading: boolean;
  email: string;
  password: string;
}

class UserScreen extends React.Component<{}, IState> {
  static navigationOptions = ({ navigation, screenProps }): NavigationScreenOptions => {
    return {
      title: '登录'
    }
  }

  state: IState = {
    loading: false,
    email: '',
    password: '',
  };

  componentWillMount() {
    this.submit = this.submit.bind(this);
  };

  submit() {
    this.setState({
      loading: true,
    });
    UserService
      .createSession(
        this.state.email,
        this.state.password,
      )
      .then((response) => {
        Storage.getStorage().save({
          key: 'user:token',
          data: response.data.payload.token,
          expires: null,
        });
      })
      .catch((error: ResponseError) => {
        SimpleAlert.error(
          error.response.data.message,
          () => {
            this.setState({
              loading: false,
            })
          }
        );
      })
  };

  render(): React.ReactNode {
    return (
      <Container>
        <Loading visible={this.state.loading} />
        <Form>
          <Item>
            <Input
              placeholder='电子邮箱'
              onChangeText={(value) => this.setState({ email: value })}
            />
          </Item>
          <Item last>
            <Input
              placeholder='密码'
              secureTextEntry
              onChangeText={(value) => this.setState({ password: value })}
            />
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
