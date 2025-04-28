import { StyleSheet } from 'react-native';
import { colors } from '../../Styles/ComumStyles';

export default StyleSheet.create({
  headerStyle: {
    backgroundColor: '#696969',
    paddingTop: '2%',
    paddingHorizontal: '3%',
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  menuIcon: {
    color: colors.secondary,
    fontSize: 24,
  },
  HeaderText: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
});
