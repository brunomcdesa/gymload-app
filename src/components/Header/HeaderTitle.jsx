import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { ComumStyles } from '../Styles/ComumStyles';
import style from './style/style';

const HeaderTitle = (props) => {
  const { title, subtitle, isForm = false } = props;
  const { container, titleStyle, subtitleStyle } = style;
  const { asteriscoObrigatorio } = ComumStyles;

  const renderSubtitle = () => {
    if (isForm) {
      return (
        <Text style={subtitleStyle} numberOfLines={2}>
          Campos marcados com <Text style={asteriscoObrigatorio}>*</Text> são
          obrigatórios
        </Text>
      );
    }

    if (subtitle) {
      return (
        <Text style={subtitleStyle} numberOfLines={1}>
          {subtitle}
        </Text>
      );
    }

    return null;
  };

  return (
    <View style={container}>
      <Text
        style={titleStyle}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.85}
      >
        {title}
      </Text>
      {renderSubtitle()}
    </View>
  );
};

HeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  isForm: PropTypes.bool,
};

export default HeaderTitle;
