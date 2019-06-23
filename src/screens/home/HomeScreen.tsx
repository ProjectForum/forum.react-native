import * as React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import { NavigationScreenOptions, NavigationScreenProps, FlatList } from 'react-navigation'
import { Container, Thumbnail, Text } from 'native-base';
import { TopicCard } from '../../components';
import { Theme } from '../../utils';

interface IProps { }

class HomeScreen extends React.Component<NavigationScreenProps<IProps>> {
  static navigationOptions = ({ navigation, screenProps }): NavigationScreenOptions => {
    return {
      title: '时间线',
    }
  }

  state = {
    refreshing: true,
  }

  componentDidMount() {
    setTimeout(() => this.setState({ refreshing: false }), 800)
  }

  render(): React.ReactNode {
    return (
      <Theme.ThemeContext.Consumer>
        {({ theme }) => (
          <Container style={styles.container}>
            <FlatList
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({
                  refreshing: true,
                });
                setTimeout(() => {
                  this.setState({
                    refreshing: false,
                  });
                }, 1000);
              }}
              data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item, index }) => (
                <TopicCard onPress={() => { this.props.navigation.navigate('Topic') }}></TopicCard>
              )}
            />
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

export default HomeScreen
