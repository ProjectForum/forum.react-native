import createRoutesStack from './src/routes';
import { createAppContainer } from 'react-navigation';
import { bootstrap } from './src/utils';
import { Root, View } from 'native-base';
import * as React from 'react';
import { Theme } from './src/utils';
import { StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from 'react-native-spinkit';

bootstrap();

interface IAppState {
  theme: Theme.ThemeType;
  shouldRender: boolean;
}

export default class App extends React.Component<{}, IAppState> {
  state: IAppState = {
    theme: 'dark',
    shouldRender: false,
  }

  componentWillMount() {
    EStyleSheet.build(this.state.theme === 'light' ? Theme.LightStyleContext : Theme.DarkStyleContext);
  }

  componentDidMount() {
    this.setState({
      shouldRender: true,
    });
  }

  toggleTheme() {
    const nextTheme = this.state.theme === 'light' ? 'dark' : 'light';
    this.setState({
      theme: nextTheme,
    }, () => {
      EStyleSheet.build(nextTheme === 'light' ? Theme.LightStyleContext : Theme.DarkStyleContext);
      // 重新渲染组件
      this.setState({ shouldRender: false }, () => {
        this.setState({ shouldRender: true });
      });
    });
  };

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
