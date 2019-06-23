import * as React from 'react';
import { createBottomTabNavigator, NavigationRoute, NavigationScreenProp, NavigationScreenOptions } from 'react-navigation';
import AntIcon from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/home/HomeScreen';
import UserScreen from '../screens/user/UserScreen';
import BoardListScreen from '../screens/home/BoardListScreen';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { Theme } from '../utils';

interface IheaderTitleMap {
  [key: string]: {
    title: string;
    icon: string;
    headerRight?: (navigation: NavigationScreenProp<NavigationRoute>) => React.ReactElement;
  };
}

let headerTitle = '时间线';
let headerRight = null;
let defaultHeaderTitle = headerTitle;
let headerMap: IheaderTitleMap = {
  Timeline: {
    title: defaultHeaderTitle,
    icon: 'bars',
  },
  BoardList: {
    title: '板块',
    icon: 'layout',
    headerRight: (navigation) => (
      <Button transparent primary style={{ alignSelf: 'center' }} onPress={() => navigation.navigate('Forum/NewTopic')}>
        <Text>发布新帖</Text>
      </Button>
    ),
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

export default function () {
  return createBottomTabNavigator(
    {
      Timeline: HomeScreen,
      BoardList: BoardListScreen,
      User: UserScreen,
    },
    {
      navigationOptions: (): NavigationScreenOptions => ({
        headerLeft: (
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: Theme.buildColor('#323232', '#eee') }}>{headerTitle}</Text>
          </View>
        ),
        headerRight,
        headerBackTitle: null,
        headerStyle: {
          borderBottomWidth: 0,
          backgroundColor: Theme.buildColor('#fff', '#222'),
        },
      }),
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ tintColor }) => getTabbarIcon(navigation, tintColor),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
          // 标题
          headerTitle = headerMap[navigation.state.routeName].title;
          // 右侧内容
          const headerRightGenerator = headerMap[navigation.state.routeName].headerRight;
          if (headerRightGenerator) {
            headerRight = headerRightGenerator(navigation);
          } else {
            headerRight = null;
          }
          defaultHandler();
        }
      }),
      tabBarOptions: {
        activeTintColor: '#f64e59',
        inactiveTintColor: '#cacaca',
        style: {
          borderTopColor: Theme.buildColor('#eee', '#333'),
          backgroundColor: Theme.buildColor('#fff', '#222'),
        },
      },
      lazy: true,
    }
  )
}
