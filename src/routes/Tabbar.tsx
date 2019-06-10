import * as React from 'react';
import { createBottomTabNavigator, NavigationRoute, NavigationScreenProp, NavigationScreenOptions } from 'react-navigation';
import AntIcon from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../screens/home/HomeScreen';
import UserScreen from '../screens/user/UserScreen';
import BoardListScreen from '../screens/home/BoardListScreen';
import { View } from 'react-native';
import { Button, Text } from 'native-base';

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
      headerRight,
      headerBackTitle: null,
      headerStyle: {
        borderBottomWidth: 0,
      },
    }),
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => getTabbarIcon(navigation, tintColor),
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        headerTitle = headerMap[navigation.state.routeName].title;
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
        borderTopColor: '#eee',
      },
    },
  }
)
