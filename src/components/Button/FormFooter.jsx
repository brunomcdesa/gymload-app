import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import style from './style/formFooterStyle';

const FormFooter = ({ onSave, onBack, loading, saveLabel = 'SALVAR' }) => {

  return (
    <View style={style.formFooter}>
      <TouchableOpacity
        style={style.backButton}
        onPress={onBack}
        disabled={loading}
      >
        <Text style={style.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[style.saveButton, loading && style.saveButtonDisabled]}
        onPress={!loading ? onSave : null}
        disabled={loading}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <>
            <MaterialIcons
              name="save"
              size={18}
              color="#fff"
              style={style.saveButtonIcon}
            />
            <Text style={style.saveButtonText}>{saveLabel}</Text>
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
