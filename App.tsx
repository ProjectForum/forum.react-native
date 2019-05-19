import RoutesStack from './src/routes';
import { createAppContainer } from 'react-navigation';
import { bootstrap } from './src/utils';

bootstrap();

export default createAppContainer(RoutesStack);
