import { StyleSheet } from 'react-native';
import { colors } from '../../../../components/Styles/ComumStyles';

export default StyleSheet.create({
  elementContainer: {
    padding: 15,
    backgroundColor: colors.inputBackground,
    borderRadius: 16,
    marginVertical: 8,
    shadowColor: 'rgba(255, 85, 85, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  userInfoName: {
    paddingLeft: 15,
    color: colors.textLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  avatarLetter: {
    color: colors.secondary,
    fontSize: 22,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userEmail: {
    paddingLeft: 15,
    color: colors.placeholderText,
    fontSize: 14,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1, // Faz o container ocupar todo o espaço do Modal
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.inputBackground,
    borderRadius: 20,
    padding: 25,
    width: '90%',
    maxWidth: 500,
    borderWidth: 1,
    borderColor: '#444',

    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Sombra para Android
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textLight,
    // 'margin: 0' não é necessário para componentes Text
  },
  detailRow: {
    flexDirection: 'row', // Necessário para alinhar itens horizontalmente
    justifyContent: 'space-between',
    alignItems: 'center', // Bom para alinhamento vertical
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBorder,
  },
  detailLabel: {
    fontSize: 16,
    color: colors.placeholderText,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'right',
  },
  closeButton: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 12,
    marginTop: 15,
    // A propriedade 'cursor' não existe, o feedback visual é dado pelo componente (ex: TouchableOpacity)
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
