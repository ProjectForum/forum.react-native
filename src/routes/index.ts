import { createStackNavigator } from "react-navigation";
import TopicScreen from "../screens/home/TopicScreen";
import Tabbar from './Tabbar';
import HomeScreen from "../screens/home/HomeScreen";
import LoginScreen from '../screens/user/LoginScreen';
import NewTopicScreen from '../screens/forum/NewTopicScreen';
import TestViewer from '../screens/forum/TestViewer';


export default createStackNavigator({
  Tab: {
    screen: Tabbar
  },
  'Forum/Test': TestViewer,
  'Forum/NewTopic': NewTopicScreen,
  Topic: TopicScreen,
  Home: HomeScreen,
  Login: LoginScreen,
}, {
    headerMode: 'screen',
  }
);
