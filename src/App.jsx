import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Header from './components/Header/Header';
import Navegacao from './routes/Navegacao';

const App = () => (
  <SafeAreaView style={style.App}>
    <Header />
    <Navegacao />
  </SafeAreaView>
);

const style = StyleSheet.create({
  App: {
    flex: 1,
  },
});

export default App;
