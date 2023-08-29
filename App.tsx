import {View, Text, StatusBar} from 'react-native';
import React, {Fragment, useEffect, useState} from 'react';
import Auth from './src/Auth';

import {store} from './src/redux/Store';
import {Provider} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import Color from './src/asset/Color';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import Splashscreen from './src/auth/Splashscreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ThemeProvider, Button, createTheme} from '@rneui/themed';

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
