import { createStackNavigator } from "react-navigation";
import TopicScreen from "../screens/home/TopicScreen";
import createTabbar from './Tabbar';
import HomeScreen from "../screens/home/HomeScreen";
import LoginScreen from '../screens/user/LoginScreen';
import NewTopicScreen from '../screens/forum/NewTopicScreen';
import TestViewer from '../screens/forum/TestViewer';
import { Theme } from '../utils';


export default function () {
  return createStackNavigator({
    Tab: {
      screen: createTabbar(),
    },
    Topic: TopicScreen,
    'Forum/Test': TestViewer,
    'Forum/NewTopic': NewTopicScreen,
    Login: LoginScreen,
  }, {
      headerMode: 'screen',
      defaultNavigationOptions: () => ({
        headerTintColor: Theme.buildColor('#323232', '#eee'),
        headerStyle: {
          borderBottomWidth: 0,
          backgroundColor: Theme.buildColor('#fff', '#222'),
        },
      }),
    }
  )
};
