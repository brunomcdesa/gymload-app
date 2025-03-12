import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Header from './components/Header/Header';
import Body from './components/Body/Body';


export default () => (
  <>
    <SafeAreaView style={style.App}>
        <Header />
        <Body />
    </SafeAreaView>
  </>
);

const style = StyleSheet.create({
  App: {
  },
});
