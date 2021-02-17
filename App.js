/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {View, Text} from "react-native"

import { WebView } from 'react-native-webview';


const App = () => {
  return (
    <View style={{height:1000}}>
      <Text>Try 2</Text>
      <WebView source={{ uri: 'https://reactnative.dev/' }} />
    </View>
  );
};


export default App;
