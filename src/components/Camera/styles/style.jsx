import { StyleSheet } from 'react-native';
import { colors } from '../../Styles/ComumStyles';

const {
  background,
  inputBackground,
  inputBorder,
  buttonText,
  primary,
  secondary,
} = colors;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: background,
    padding: 20,
  },
  permissionText: {
    color: colors.textLight,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: inputBorder,
  },
  closeButtonText: {
    color: buttonText,
    fontSize: 16,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: secondary,
  },
  topControls: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: inputBackground,
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: inputBorder,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: secondary,
    backgroundColor: background,
    shadowColor: secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonSpacer: {
    width: 32,
  },
});
