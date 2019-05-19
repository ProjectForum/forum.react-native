import React from 'react';
import { createBottomTabNavigator, NavigationRoute, NavigationScreenProp } from 'react-navigation';
import AntIcon from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/home/HomeScreen';
import UserScreen from '../screens/user/UserScreen';

/**
 * 获取Tabbar的图标
 * @param navigation 
 * @param tintColor 
 */
const getTabbarIcon = (navigation: NavigationScreenProp<NavigationRoute>, tintColor: string) => {
  const { routeName } = navigation.state;
  const iconMap = {
    Home: 'home',
    '首页': 'home',
    '我的': 'user',
  };
  return (
    <AntIcon name={iconMap[routeName]} size={25} color={tintColor} />
  )
}

let headerTitle = 'Home';

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    '首页': HomeScreen,
    '我的': UserScreen,
  },
  {
    navigationOptions: () => ({
      headerTitle,
    }),
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => getTabbarIcon(navigation, tintColor),
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        headerTitle = navigation.state.routeName;
        defaultHandler();
      }
    }),
    tabBarOptions: {
      activeTintColor: '#f64e59',
      inactiveTintColor: '#cacaca',
    },
  }
)
