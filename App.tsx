import createRoutesStack from './src/routes';
import { createAppContainer } from 'react-navigation';
import { bootstrap } from './src/utils';
import { Root, View } from 'native-base';
import * as React from 'react';
import { Theme } from './src/utils';
import { StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from 'react-native-spinkit';
import { Storage } from './src/utils';

bootstrap();

interface IAppState {
  theme: Theme.ThemeType;
  shouldRender: boolean;
}

export default class App extends React.Component<{}, IAppState> {
  state: IAppState = {
    theme: 'light',
    shouldRender: false,
  }

  componentDidMount() {
    // 加载主题
    Storage.getStorage().load<Theme.ThemeType>({
      key: 'themeState',
    }).then(theme => {
      this.buildTheme(theme);
      this.setState({
        shouldRender: true,
        theme: theme,
      });
    }).catch(error => {
      this.buildTheme(this.state.theme);
      this.setState({
        shouldRender: true,
      });
    });
  }

  /**
   * 切换主题
   */
  toggleTheme() {
    const nextTheme = this.state.theme === 'light' ? 'dark' : 'light';
    this.setState({
      theme: nextTheme,
    }, () => {
      this.buildTheme(nextTheme);
      // 保存设置
      Storage.getStorage().save({
        key: 'themeState',
        data: nextTheme,
      });
      // 重新渲染组件
      this.setState({ shouldRender: false }, () => {
        this.setState({ shouldRender: true });
      });
    });
  };

  /**
   * 构建指定主题
   */
  buildTheme(theme: Theme.ThemeType) {
    EStyleSheet.build(theme === 'light' ? Theme.LightStyleContext : Theme.DarkStyleContext);
  }

  render() {
    if (this.state.shouldRender) {
      const AppContainer = createAppContainer(createRoutesStack());
      return (
        <Root>
          <Theme.ThemeContext.Provider
            value={{ theme: this.state.theme, toggleTheme: this.toggleTheme.bind(this) }}
          >
            <AppContainer style={{ backgroundColor: '#000' }} />
            <StatusBar
              barStyle={this.state.theme === 'light' ? 'default' : 'light-content'}
            />
          </Theme.ThemeContext.Provider>
        </Root>
      )
    } else {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
          <Spinner type='Pulse' color='#bbb' size={40} />
        </View>
      );
    }
  }
}
