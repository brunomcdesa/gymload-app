import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  elementContainer: {
    padding: 15,
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    marginVertical: 8,
    shadowColor: 'rgba(255, 85, 85, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#383838',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  userInfoName: {
    paddingLeft: 15,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff5555',
  },
  avatarLetter: {
    color: '#ff5555',
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
    color: '#aaa',
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
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    padding: 25,
    width: '90%',
    maxWidth: 500,
    borderWidth: 1,
    borderColor: '#444',

    shadowColor: '#000',
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
    color: '#fff',
    // 'margin: 0' não é necessário para componentes Text
  },
  detailRow: {
    flexDirection: 'row', // Necessário para alinhar itens horizontalmente
    justifyContent: 'space-between',
    alignItems: 'center', // Bom para alinhamento vertical
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#383838',
  },
  detailLabel: {
    fontSize: 16,
    color: '#aaa',
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'right',
  },
  closeButton: {
    backgroundColor: '#ff5555',
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
