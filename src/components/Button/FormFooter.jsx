import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ComumStyles, colors } from '../Styles/ComumStyles';
import AnimatedPressable from './AnimatedPressable';

const FormFooter = ({ onSave, onBack, loading, saveLabel = 'SALVAR' }) => {
  return (
    <View style={ComumStyles.formFooter}>
      <AnimatedPressable
        style={ComumStyles.backButton}
        onPress={onBack}
        disabled={loading}
      >
        <Text style={ComumStyles.backButtonText}>Voltar</Text>
      </AnimatedPressable>
      <AnimatedPressable
        style={[
          ComumStyles.saveButton,
          loading && ComumStyles.saveButtonDisabled,
        ]}
        onPress={!loading ? onSave : null}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.buttonText} size="small" />
        ) : (
          <>
            <MaterialIcons
              name="save"
              size={18}
              color={colors.buttonText}
              style={ComumStyles.saveButtonIcon}
            />
            <Text style={ComumStyles.saveButtonText}>{saveLabel}</Text>
          </>
        )}
      </AnimatedPressable>
    </View>
  );
};

FormFooter.propTypes = {
  onSave: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  saveLabel: PropTypes.string,
};

export default FormFooter;
