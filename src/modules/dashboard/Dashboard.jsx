import React from 'react';
import { Text, View } from 'react-native';
import { ComumStyles } from '../../components/Styles/ComumStyles';

const Dashboard = () => {
  const { container, subSubTitle } = ComumStyles;

  return (
    <View style={container}>
      <Text style={subSubTitle}>Dashboard em desenvolvimento...</Text>
    </View>
  );
};

export default Dashboard;
