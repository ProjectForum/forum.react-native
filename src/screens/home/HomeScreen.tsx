import * as React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native'
import { NavigationScreenOptions, NavigationScreenProps, FlatList } from 'react-navigation'
import { Container, Thumbnail, Text } from 'native-base';
import { TopicCard } from '../../components';
import ButtonComponent from 'react-native-button-component';

interface IProps { }

class HomeScreen extends React.Component<NavigationScreenProps<IProps>> {
  static navigationOptions = ({ navigation, screenProps }): NavigationScreenOptions => {
    return {
      title: '测试',
      headerTitle: '123',
      header: (
        <View>
          <Text></Text>
        </View>
      )
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
      <Container>
        <FlatList
          refreshing={this.state.refreshing}
          onRefresh={() => {}}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item, index }) => (
            <TopicCard onPress={() => { this.props.navigation.navigate('Topic') }}></TopicCard>
          )}
        />
      </Container>
    )
  }
}

export default HomeScreen
