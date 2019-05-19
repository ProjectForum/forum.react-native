import * as React from 'react';
import { View, Text, Button } from 'react-native'
import { NavigationScreenOptions, NavigationScreenProps } from 'react-navigation'

class UserScreen extends React.Component<NavigationScreenProps> {
    static navigationOptions = ({ navigation, screenProps }): NavigationScreenOptions => {
        return {
            title: '我的'
        }
    }
    render(): React.ReactNode {
        return (
            <View>
                <Text>我的</Text>
                <Button title="Dark" onPress={() => { this.props.navigation.navigate('Login') }}></Button>
            </View>
        )
    }
}

export default UserScreen
