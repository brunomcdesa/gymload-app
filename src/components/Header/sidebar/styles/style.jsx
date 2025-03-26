import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  Content: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 20,
    paddingTop: 60,
  },
  Button: {
    backgroundColor: '#ff5555',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: 'center',
    width: '80%',
  },
  ButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  Footer: {
    paddingBottom: 20,
  },
});
