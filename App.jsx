/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { images } from './constants';
import GetStarted from './components/getstarted/GetStarted';


function App() {

  return (
    <SafeAreaView style={{flex:1, backgroundColor: "#fff"}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={"#fff"}
      />
      <GetStarted />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  main: {
    backgroundColor: "#f3f4f8",
  },
  
  text: {
    color: "#282828"
  },


  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
