import {View, Text, StatusBar} from 'react-native';
import React, {Fragment} from 'react';
import Auth from './src/auth/Auth';

import {store} from './src/redux/Store';
import {Provider} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import Color from './src/asset/Color';

export default function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: 'red'}} />
        <SafeAreaView style={{flex: 1, backgroundColor: 'blue'}}>
          <StatusBar backgroundColor={Color.primary} barStyle="dark-content" />

          <Auth />
        </SafeAreaView>
      </Fragment>
    </Provider>
  );
}
