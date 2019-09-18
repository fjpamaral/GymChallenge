// import { NativeModules } from 'react-native';
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
// import { NativeModules } from 'react-native';

// let scriptHostname;
// if (__DEV__) {
//   const { scriptURL } = NativeModules.SourceCode;
//   scriptHostname = scriptURL.split('://')[1].split(':')[0];
// }

const tron = Reactotron
  // .configure({ host: scriptHostname })
  .configure()
  .useReactNative()
  .use(reactotronRedux())
  .use(sagaPlugin())
  .connect();
tron.clear();

if (__DEV__) console.tron = tron;
