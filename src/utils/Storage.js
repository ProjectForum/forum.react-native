import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

export function initStorage() {
  /**
   * @HACK
   * 直接把storage挂载在global上
   */
  global.storage = new Storage({
    storageBackend: AsyncStorage,
    enableCache: true,
  });
}

export function getStorage() {
  return global.storage;
}
