import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ComumStyles, colors } from '../Styles/ComumStyles';

const FormFooter = ({ onSave, onBack, loading, saveLabel = 'SALVAR' }) => {
  return (
    <View style={ComumStyles.formFooter}>
      <TouchableOpacity
        style={ComumStyles.backButton}
        onPress={onBack}
        disabled={loading}
      >
        <Text style={ComumStyles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          ComumStyles.saveButton,
          loading && ComumStyles.saveButtonDisabled,
        ]}
        onPress={!loading ? onSave : null}
        disabled={loading}
        activeOpacity={0.7}
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
      </TouchableOpacity>
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
