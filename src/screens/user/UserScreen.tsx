import * as React from 'react';
import { View, Text } from 'react-native'
import { Container, Content, List, ListItem, Left, Right, Body, Button, Switch, Icon } from 'native-base';
import { Theme } from '../../utils';
import { NavigationStackScreenProps, NavigationStackOptions } from 'react-navigation-stack';

class UserScreen extends React.Component<NavigationStackScreenProps> {
  static navigationOptions = ({ navigation, screenProps }): NavigationStackOptions => {
    return {
      title: '我的'
    }
  }
  render(): React.ReactNode {
    return (
      <Theme.ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <Container style={styles.container}>
            <Content>
              <List>
                <ListItem style={{ borderBottomColor: '#000 ' }}>
                  <Left>
                    <Text>夜间模式</Text>
                  </Left>
                  <Right>
                    <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
                  </Right>
                </ListItem>
              </List>
            </Content>
          </Container>
        )}
      </Theme.ThemeContext.Consumer>
    )
  }
}

const styles = Theme.createStyle({
  container: {
    backgroundColor: '$backgroundColor',
  },
});

export default UserScreen
