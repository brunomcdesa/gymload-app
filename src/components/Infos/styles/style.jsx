import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16, // Espaço entre os blocos
  },
  infoBlock: {
    flex: 1, // Faz cada bloco ocupar metade do espaço na linha
  },
  infoBlockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoIcon: {
    color: '#E53935',
  },
  infoLabel: {
    fontSize: 14,
    color: '#B0B0B0',
  },
  infoValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    marginTop: 4,
  },
  input: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#48484A',
  },
});
