import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../components/Styles/ComumStyles';
import IconeAerobico from '../../icons/IconeAerobico';
import IconeCalistenia from '../../icons/IconeCalistenia';
import IconeMusculacao from '../../icons/IconeMusculacao';

const iconesTipoExercicio = [
  {
    tipo: 'MUSCULACAO',
    icone: <IconeMusculacao size={100} color={colors.secondary} />,
  },
  {
    tipo: 'CALISTENIA',
    icone: <IconeCalistenia size={100} color={colors.secondary} />,
  },
  {
    tipo: 'AEROBICO',
    icone: <IconeAerobico size={100} color={colors.secondary} />,
  },
];

export const renderIconeTipoExercicio = (tipo) => {
  const icone = iconesTipoExercicio.find((config) => config.tipo === tipo);
  return icone ? (
    icone.icone
  ) : (
    <MaterialIcons
      name={'fitness-center'}
      size={100}
      color={colors.secondary}
    />
  );
};
