import { createStackNavigator } from "react-navigation";
import TopicScreen from "../screens/home/TopicScreen";
import Tabbar from './Tabbar';
import HomeScreen from "../screens/home/HomeScreen";
import LoginScreen from '../screens/user/LoginScreen';

export default createStackNavigator({
  Login: LoginScreen,
  Tab: {
    screen: Tabbar
  },
  Home: HomeScreen,
  Topic: TopicScreen,
}, {
    headerMode: 'screen',
  }
);
