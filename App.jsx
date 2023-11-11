/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { images } from './constants';


function App() {

  return (
    <SafeAreaView style={{flex:1, backgroundColor: "#fff"}}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={"#fff"}
      />
      <View style={{flex:1, backgroundColor: "#fff", justifyContent: "space-between", alignItems: "center"}}>
        
        <View style={{flexDirection: "row", justifyContent: "flex-end", width: "100%"}}>
          <View style={{height: 150, aspectRatio: 0.79}}>
            <Image
              source={images.headerwave}
              style={{
                resizeMode:"cover",
                height:'100%',
                width:'100%'
              }}
            />
          </View>
        </View>

        <View style={{borderWidth: 1, width: '100%', paddingLeft: 20}}>
          <View>
            <Text style={{color: "#282828", fontSize: 50, fontWeight: 'bold', lineHeight: 50}}>UNI {'\n'}MONEY</Text>
          </View>
          <View style={{marginTop: 10}}>
            <Text style={{color: "#282828", fontSize: 15, fontWeight: 'bold'}}>Unify your finances, {'\n'}Simply your life</Text>
          </View>
        </View>

        <View style={{width: "100%"}}>
          <View style={{aspectRatio: 1.8}}>
            <Image
              source={images.wave_with_coin}
              style={{
                resizeMode:"cover",
                height:'100%',
                width:'100%'
              }}
            />
          </View>
          <View style={{width: '100%', height: 100, backgroundColor: "#00B899"}} />
        </View>

      </View>
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
