import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../components/Styles/ComumStyles';
import IconeAbdomen from '../../icons/gruposMusculares/IconeAbdomen';
import IconeAdutor from '../../icons/gruposMusculares/IconeAdutor';
import IconeAntebraco from '../../icons/gruposMusculares/IconeAntebraco';
import IconeBiceps from '../../icons/gruposMusculares/IconeBiceps';
import IconeCostas from '../../icons/gruposMusculares/IconeCostas';
import IconeGluteo from '../../icons/gruposMusculares/IconeGluteo';
import IconeOmbro from '../../icons/gruposMusculares/IconeOmbro';
import IconePanturrilha from '../../icons/gruposMusculares/IconePanturrilha';
import IconePeitoral from '../../icons/gruposMusculares/IconePeitoral';
import IconePosteriorCoxa from '../../icons/gruposMusculares/IconePosteriorCoxa';
import IconeQuadriceps from '../../icons/gruposMusculares/IconeQuadriceps';
import IconeTrapezio from '../../icons/gruposMusculares/IconeTrapezio';
import IconeTriceps from '../../icons/gruposMusculares/IconeTriceps';
import IconeAerobico from '../../icons/tiposExercicio/IconeAerobico';
import IconeCalistenia from '../../icons/tiposExercicio/IconeCalistenia';
import IconeMusculacao from '../../icons/tiposExercicio/IconeMusculacao';

const iconesTipoExercicio = [
  { tipo: 'MUSCULACAO', Componente: IconeMusculacao },
  { tipo: 'CALISTENIA', Componente: IconeCalistenia },
  { tipo: 'AEROBICO', Componente: IconeAerobico },
];

const iconesGruposMusculares = [
  { grupoMuscular: 'Peitoral', Componente: IconePeitoral },
  { grupoMuscular: 'Costas', Componente: IconeCostas },
  { grupoMuscular: 'Quadríceps', Componente: IconeQuadriceps },
  { grupoMuscular: 'Posterior de Coxa', Componente: IconePosteriorCoxa },
  { grupoMuscular: 'Bíceps', Componente: IconeBiceps },
  { grupoMuscular: 'Tríceps', Componente: IconeTriceps },
  { grupoMuscular: 'Ombro', Componente: IconeOmbro },
  { grupoMuscular: 'Abdomen', Componente: IconeAbdomen },
  { grupoMuscular: 'Antebraço', Componente: IconeAntebraco },
  { grupoMuscular: 'Panturrilha', Componente: IconePanturrilha },
  { grupoMuscular: 'Glúteo', Componente: IconeGluteo },
  { grupoMuscular: 'Adutor', Componente: IconeAdutor },
  { grupoMuscular: 'Trapézio', Componente: IconeTrapezio },
];

export const renderIconeTipoExercicio = (
  tipo,
  isSexoFeminino,
  size = 100,
  color = colors.secondary,
) => {
  const found = iconesTipoExercicio.find((i) => i.tipo === tipo);
  return found ? (
    <found.Componente
      size={size}
      isSexoFeminino={isSexoFeminino}
      color={color}
    />
  ) : (
    <MaterialIcons name="fitness-center" size={size} color={color} />
  );
};

export const renderIconeGrupoMuscular = (
  grupoMuscular,
  isSexoFeminino,
  size = 85,
  color = colors.secondary,
) => {
  const found = iconesGruposMusculares.find(
    (i) => i.grupoMuscular === grupoMuscular,
  );
  return found ? (
    <found.Componente
      size={size}
      isSexoFeminino={isSexoFeminino}
      color={color}
    />
  ) : (
    <MaterialIcons name="fitness-center" size={size} color={color} />
  );
};
