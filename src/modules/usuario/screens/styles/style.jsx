import { StyleSheet } from 'react-native';
import { colors } from '../../../../components/Styles/ComumStyles';

export default StyleSheet.create({
  mainContainer: {
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editButtonText: {
    color: colors.secondary,
    fontSize: 16,
  },
  infoSection: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#383838',
    marginHorizontal: 16,
  },
  infoItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: colors.textLight,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#383838',
    marginHorizontal: 16,
  },
  cancelButton: {
    padding: 8,
  },
  cancelButtonText: {
    color: '#aaa',
    fontSize: 16,
  },
  input: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
    paddingVertical: 4,
    minWidth: '60%',
  },
  inputUsername: {
    fontSize: 16,
    color: colors.secondary,
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
    paddingVertical: 4,
    marginTop: 4,
  },
  editingContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 2,
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
});
