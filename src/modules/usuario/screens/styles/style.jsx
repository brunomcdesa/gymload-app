import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 30,
    minHeight: 80,
  },
  headerViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  userNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  inputNome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#E53935',
    flex: 1,
    paddingBottom: 4,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 6,
  },
  editButtonText: {
    color: '#E53935',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 8,
  },
  cancelButtonText: {
    color: '#B0B0B0',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#48484A',
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  genderSelector: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  genderButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#48484A',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderButtonSelected: {
    backgroundColor: '#E53935',
    borderColor: '#E53935',
  },
  genderButtonText: {
    color: '#B0B0B0',
    fontWeight: 'bold',
  },
  genderButtonTextSelected: {
    color: '#FFFFFF',
  },
  actionButtonContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
});
