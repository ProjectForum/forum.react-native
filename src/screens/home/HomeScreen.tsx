import * as React from 'react';
import { View, StyleSheet, TouchableHighlight, RefreshControl } from 'react-native'
import { FlatList } from 'react-navigation'
import { Container, Thumbnail, Text } from 'native-base';
import { TopicCard } from '../../components';
import { Theme } from '../../utils';
import { NavigationStackOptions, NavigationStackScreenProps } from 'react-navigation-stack';

interface IProps { }

class HomeScreen extends React.Component<NavigationStackScreenProps<IProps>> {
  static navigationOptions = ({ navigation, screenProps }): NavigationStackOptions => {
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
              refreshControl={
                <RefreshControl
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
                  tintColor={styles.refresh.backgroundColor}
                  colors={
                    [
                      '#FF0000',
                      '#FFA500',
                      '#0000FF',
                      '#008000'
                    ]
                  }
                />
              }
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
  refresh: {
    backgroundColor: '$titleColor',
  },
});

export default HomeScreen
