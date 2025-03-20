import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  ExercicioContainer: {
    flexDirection: 'column',
  },
  ExercicioDescricaoText: {
    fontSize: 15,
    color: '#333',
  },
  BotaoHistorico: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  BotaoTexto: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
});
