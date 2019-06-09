import * as React from 'react';
import { createBottomTabNavigator, NavigationRoute, NavigationScreenProp, NavigationScreenOptions } from 'react-navigation';
import AntIcon from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/home/HomeScreen';
import UserScreen from '../screens/user/UserScreen';
import BoardListScreen from '../screens/home/BoardListScreen';
import { View, Text } from 'react-native';

interface IheaderTitleMap {
  [key: string]: {
    title: string;
    icon: string;
  };
}

let headerTitle = '时间线';
let defaultHeaderTitle = headerTitle;
let headerMap: IheaderTitleMap = {
  Timeline: {
    title: defaultHeaderTitle,
    icon: 'bars',
  },
  BoardList: {
    title: '板块',
    icon: 'layout',
  },
  User: {
    title: '我的',
    icon: 'user',
  },
};

/**
 * 获取Tabbar的图标
 * @param navigation 
 * @param tintColor 
 */
const getTabbarIcon = (navigation: NavigationScreenProp<NavigationRoute>, tintColor: string) => {
  const { routeName } = navigation.state;
  return (
    <AntIcon name={headerMap[routeName].icon} size={25} color={tintColor} />
  )
}

export default createBottomTabNavigator(
  {
    Timeline: HomeScreen,
    BoardList: BoardListScreen,
    User: UserScreen,
  },
  {
    navigationOptions: (): NavigationScreenOptions => ({
      headerLeft: (
        <View style={{ marginLeft: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#323232' }}>{headerTitle}</Text>
        </View>
      ),
      headerBackTitle: null,
      headerStyle: {
        borderBottomWidth: 0,
      },
    }),
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => getTabbarIcon(navigation, tintColor),
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        headerTitle = headerMap[navigation.state.routeName].title;
        defaultHandler();
      }
    }),
    tabBarOptions: {
      activeTintColor: '#f64e59',
      inactiveTintColor: '#cacaca',
      style: {
        borderTopColor: '#eee',
      },
    },
  }
)
