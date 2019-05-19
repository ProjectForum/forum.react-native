import * as React from 'react';
import { View, Text, Button } from 'react-native'
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation'

interface IProps { }

class HomeScreen extends React.Component<NavigationScreenProps<IProps>> {
    static navigationOptions = ({ navigation, screenProps }): NavigationScreenOptions => {
        return {
            title: '测试',
            headerTitle: '123'
        }
    }
    render(): React.ReactNode {
        return (
            <View>
                <Text>测试</Text>
                <Text>测试</Text>

                <Text>{this.props.navigation.state.routeName}</Text>
                <Button title="Dark" onPress={() => { this.props.navigation.navigate('Topic') }}></Button>
            </View>
        )
    }
}

export default HomeScreen
