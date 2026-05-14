import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#262626',
    borderRadius: 16,
    marginVertical: 6,
    padding: 14,
    borderWidth: 1,
    borderColor: '#333',
    overflow: 'hidden',
    position: 'relative',
  },
  stripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#ff5555',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#2f2f2f',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  nomeText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    paddingLeft: 12,
  },
  fieldContainer: {
    marginBottom: 4,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#222',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 16,
  },
});
