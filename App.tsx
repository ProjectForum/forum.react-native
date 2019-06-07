import RoutesStack from './src/routes';
import { createAppContainer } from 'react-navigation';
import { bootstrap } from './src/utils';
import { Root } from 'native-base';
import * as React from 'react';

bootstrap();

const App = createAppContainer(RoutesStack);

export default () => (
    <Root>
        <App />
    </Root>
);