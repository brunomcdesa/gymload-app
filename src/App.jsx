import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import Header from './components/Header/Header';
import Navegacao from './routes';


export default () => (
  <>
    <SafeAreaView style={style.App}>
        <Header />
        <Navegacao />
    </SafeAreaView>
  </>
);

const style = StyleSheet.create({
  App: {
    flex: 1
  },
});
