import { StyleSheet } from 'react-native';
import { colors } from '../../Styles/ComumStyles';

export default StyleSheet.create({
  imageContainer: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  imageSizeBig: {
    width: 100,
    height: 100,
  },
  imageSizeSmall: {
    width: 65,
    height: 65,
  },
});
