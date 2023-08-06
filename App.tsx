import {View, Text, StatusBar} from 'react-native';
import React, {Fragment} from 'react';
import Auth from './src/Auth';

import {store} from './src/redux/Store';
import {Provider} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import Color from './src/asset/Color';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Fragment>
          <SafeAreaView style={{flex: 0, backgroundColor: 'red'}} />
          <SafeAreaView style={{flex: 1, backgroundColor: 'blue'}}>
            <StatusBar
              backgroundColor={Color.primary}
              barStyle="dark-content"
            />

            <Auth />
          </SafeAreaView>
        </Fragment>
      </Provider>
    </QueryClientProvider>
  );
}
