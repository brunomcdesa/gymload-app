import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../components/Styles/ComumStyles';
import IconeBiceps from '../../icons/gruposMusculares/IconeBiceps';
import IconeCostas from '../../icons/gruposMusculares/IconeCostas';
import IconePeitoral from '../../icons/gruposMusculares/IconePeitoral';
import IconePosteriorCoxa from '../../icons/gruposMusculares/IconePosteriorCoxa';
import IconeQuadriceps from '../../icons/gruposMusculares/IconeQuadriceps';
import IconeTriceps from '../../icons/gruposMusculares/IconeTriceps';
import IconeAerobico from '../../icons/tiposExercicio/IconeAerobico';
import IconeCalistenia from '../../icons/tiposExercicio/IconeCalistenia';
import IconeMusculacao from '../../icons/tiposExercicio/IconeMusculacao';

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

const iconesGruposMusculares = [
  {
    grupoMuscular: 'Peitoral',
    icone: <IconePeitoral size={85} color={colors.secondary} />,
  },
  {
    grupoMuscular: 'Costas',
    icone: <IconeCostas size={85} color={colors.secondary} />,
  },
  {
    grupoMuscular: 'Quadríceps',
    icone: <IconeQuadriceps size={85} color={colors.secondary} />,
  },
  {
    grupoMuscular: 'Posterior de Coxa',
    icone: <IconePosteriorCoxa size={85} color={colors.secondary} />,
  },
  {
    grupoMuscular: 'Bíceps',
    icone: <IconeBiceps size={85} color={colors.secondary} />,
  },
  {
    grupoMuscular: 'Tríceps',
    icone: <IconeTriceps size={85} color={colors.secondary} />,
  },
  {
    grupoMuscular: 'Ombro',
    icone: <IconeCostas size={85} color={colors.secondary} />, //
  },
  {
    grupoMuscular: 'Abdomen',
    icone: <IconeCostas size={85} color={colors.secondary} />, //
  },
  {
    grupoMuscular: 'Antebraço',
    icone: <IconeCostas size={85} color={colors.secondary} />, //
  },
  {
    grupoMuscular: 'Panturrilha',
    icone: <IconeCostas size={85} color={colors.secondary} />, //
  },
  {
    grupoMuscular: 'Glúteo',
    icone: <IconeCostas size={85} color={colors.secondary} />, //
  },
];

export const renderIconeTipoExercicio = (tipo) => {
  const icone = iconesTipoExercicio.find((index) => index.tipo === tipo);
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

export const renderIconeGrupoMuscular = (grupoMuscular) => {
  const icone = iconesGruposMusculares.find(
    (index) => index.grupoMuscular === grupoMuscular,
  );

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
