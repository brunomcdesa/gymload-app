import React, { useCallback, useLayoutEffect, useState } from 'react';
import { SectionList, Text, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import AddButton from '../../../components/Button/AddButton';
import LoadingIndicator from '../../../components/Loading/LoadingIndicator';
import SelectableItem from '../../../components/Selectable/SelectableItem/SelectableItem';
import { ComumStyles } from '../../../components/Styles/ComumStyles';
import * as Api from '../Api';

import HeaderTitle from '../../../components/Header/HeaderTitle';
import { throwToastError, throwToastSuccess } from '../../utils/toastUtils';
import RegistroAerobico from '../components/RegistroAerobico';
import RegistroCalistenia from '../components/RegistroCalistenia';
import RegistroMusculacao from '../components/RegistroMusculacao';
import style from '../style/style';

const RegistroAtividadesCompleto = (props) => {
  const { listContent, sectionHeader, sectionHeaderText } = style;
  const { container, fabContainer } = ComumStyles;
  const { navigation, route } = props;
  const {
    exercicio: { id, nome, tipoExercicio },
  } = route.params;
  const isExercicioMusculacao = tipoExercicio === 'MUSCULACAO';
  const isExercicioCalistenia = tipoExercicio === 'CALISTENIA';
  const isExercicioAerobico = tipoExercicio === 'AEROBICO';
  const [registroAtividadeCompleto, setRegistroAtividadeCompleto] = useState(
    [],
  );
  const [loading, setLoading] = useState(false);

  const fetchCargas = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await Api.fetchRegistroAtividadeCompleto({
        exercicioId: id,
      });
      setRegistroAtividadeCompleto(data);
    } catch (error) {
      console.error('Erro ao buscar histórico de cargas:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchCargas();
    }, [fetchCargas]),
  );

  const renderHeaderTitle = useCallback(() => {
    return <HeaderTitle title={nome} subtitle="Registro Completo" />;
  }, [nome]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: renderHeaderTitle,
    });
  }, [navigation, renderHeaderTitle]);

  const groupRegistrosByDate = (registros) => {
    const grouped = {};

    registros.forEach((registro) => {
      const date = registro.dataCadastro.split(' ')[0];

      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(registro);
    });

    return Object.keys(grouped).map((date) => ({
      title: date,
      data: grouped[date],
    }));
  };

  const groupedRegistros = groupRegistrosByDate(registroAtividadeCompleto);

  const redirectToRegistroAtividadeForm = () => {
    navigation.navigate('RegistroAtividadeForm', {
      exercicioData: {
        id,
        nome,
        isExercicioMusculacao,
        isExercicioAerobico,
        isExercicioCalistenia,
      },
      registroAtividadeData: {},
      isEdicao: false,
    });
  };

  const redirectToRegistroAtividadeFormEdit = (item) => {
    navigation.navigate('RegistroAtividadeForm', {
      exercicioData: {
        id,
        nome,
        isExercicioMusculacao,
        isExercicioAerobico,
        isExercicioCalistenia,
      },
      registroAtividadeData: { ...item },
      isEdicao: true,
    });
  };

  const repetirRegistro = async (registroId) => {
    try {
      setLoading(true);
      await Api.repetirRegistro({ exercicioId: id, registroId });
      throwToastSuccess('Registro salvo com sucesso.');
    } catch (error) {
      throwToastError('Erro ao tentar repetir registro.');
    } finally {
      setLoading(false);
    }
  };

  const getOptions = ['Editar Registro', 'Repetir Registro', 'Cancelar'];

  const selectOptionsAction = (selectedIndex, item) => {
    switch (selectedIndex) {
      case 0:
        redirectToRegistroAtividadeFormEdit(item);
        break;
      case 1:
        repetirRegistro(item.id);
        break;
      case 2:
        break;
    }
  };

  const renderItem = ({ item: registro }) => (
    <SelectableItem
      item={registro}
      cancelButtonIndex={2}
      options={getOptions}
      onActionSelected={selectOptionsAction}
      onLongPress={() => redirectToRegistroAtividadeFormEdit(registro)}
    >
      <View>
        {isExercicioAerobico && <RegistroAerobico registroData={registro} />}
        {isExercicioMusculacao && (
          <RegistroMusculacao registroData={registro} />
        )}
        {isExercicioCalistenia && (
          <RegistroCalistenia registroData={registro} />
        )}
      </View>
    </SelectableItem>
  );

  return (
    <View style={container}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <SectionList
          sections={groupedRegistros}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={listContent}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <View style={sectionHeader}>
              <Text style={sectionHeaderText}>{title}</Text>
            </View>
          )}
        />
      )}

      <View style={fabContainer}>
        <AddButton onPress={redirectToRegistroAtividadeForm} />
      </View>
    </View>
  );
};

RegistroAtividadesCompleto.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      exercicio: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setOptions: PropTypes.func.isRequired,
  }).isRequired,
};

export default RegistroAtividadesCompleto;
