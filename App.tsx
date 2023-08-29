import React, {Fragment, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import Auth from './src/Auth';

import {ThemeProvider, createTheme} from '@rneui/themed';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import Color from './src/asset/Color';
import {store} from './src/redux/Store';

const queryClient = new QueryClient();

const theme = createTheme({
  components: {
    Text: {
      style: {
        fontFamily: 'Poppins-Medium',
      },
    },
  },
});

export default function App() {
  const [showsplash, setshowsplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setshowsplash(false);
    }, 1500);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Fragment>
          <SafeAreaView style={{flex: 1, backgroundColor: Color.secondary}}>
            <StatusBar
              backgroundColor={Color.secondary}
              barStyle="dark-content"
            />
            <GestureHandlerRootView style={{flex: 1}}>
              <ThemeProvider theme={theme}>
                <Auth />
              </ThemeProvider>
            </GestureHandlerRootView>
          </SafeAreaView>
        </Fragment>
        <Toast />
      </Provider>
    </QueryClientProvider>
  );
}
