import * as React from 'react';
import { View, Text, Button } from 'react-native'
import { NavigationScreenOptions, NavigationBottomTabScreenOptions } from 'react-navigation'

class TopicScreen extends React.Component {
    static navigationOptions = ({ navigation, screenProps }): NavigationScreenOptions => {
        return {
            title: '主题',
            tabBarVisible: false,
        }
    }
    render(): React.ReactNode {
        return (
            <View>
                <Text>主题</Text>
                <Button title="Dark" onPress={() => { }}></Button>
            </View>
        )
    }
}

export default TopicScreen
