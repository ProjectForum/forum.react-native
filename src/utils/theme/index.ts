import * as React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export type ThemeType = 'light' | 'dark';
export const ThemeContext = React.createContext(null);

interface ThemedStyleContext {
  $theme: ThemeType;
  $backgroundColor: string;
  $cardGapColor: string;
  $titleColor: string;
  $borderLineColor: string;
  $bottomBarColor: string;
  $bottomInputBackgroundColor: string;
}

export const LightStyleContext: ThemedStyleContext = {
  $theme: 'light',
  $backgroundColor: '#fff',
  $cardGapColor: '#f1f1f1',
  $titleColor: '#323232',
  $borderLineColor: '#f1f1f1',
  $bottomBarColor: '#f1f1f1',
  $bottomInputBackgroundColor: '#fff',
};

export const DarkStyleContext: ThemedStyleContext = {
  $theme: 'dark',
  $backgroundColor: '#222',
  $cardGapColor: '#1f1f1f',
  $titleColor: '#bbb',
  $borderLineColor: '#313131',
  $bottomBarColor: '#444',
  $bottomInputBackgroundColor: '#666',
};

export function getThemeName(): ThemeType {
  return EStyleSheet.value('$theme');
}

export function buildColor(light: string, dark: string) {
  return getThemeName() === 'light' ? light : dark;
}

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export function createStyle<T extends NamedStyles<T> | NamedStyles<any>>(styles: T): T {
  return EStyleSheet.create(styles as any) as any;
}
