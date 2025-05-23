import React, { useCallback, useState } from 'react';
import { SectionList, Text, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import PropTypes from 'prop-types';
import AddButton from '../../../../components/Button/AddButton';
import BackButton from '../../../../components/Button/BackButton';
import LoadingIndicator from '../../../../components/Loading/LoadingIndicator';
import SelectableItem from '../../../../components/Selectable/SelectableItem/SelectableItem';
import { ComumStyles } from '../../../../components/Styles/ComumStyles';
import * as Api from '../Api';
import RegistroCardio from '../RegistroCardio';
import RegistroCarga from '../RegistroCarga';
import style from '../style/style';

const RegistroAtividadesCompleto = (props) => {
  const {
    header,
    titleStyle,
    subtitle,
    listContent,
    sectionHeader,
    sectionHeaderText,
  } = style;
  const { container, botoesContainer } = ComumStyles;
  const { navigation, route } = props;
  const {
    exercicio: { id, nome, tipoExercicioo },
  } = route.params;
  const isExercicioMusculacao = tipoExercicioo === 'MUSCULACAO';
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
      exercicioData: { id, nome },
      registroAtividadeData: {},
      isExercicioMusculacao,
      isEdicao: false,
    });
  };

  const redirectToRegistroAtividadeFormEdit = (item) => {
    navigation.navigate('RegistroAtividadeForm', {
      exercicioData: { id, nome },
      registroAtividadeData: { ...item },
      isExercicioMusculacao,
      isEdicao: true,
    });
  };

  const getOptions = ['Editar Registro', 'Cancelar'];

  const selectOptionsAction = (selectedIndex, item) => {
    switch (selectedIndex) {
      case 0:
        redirectToRegistroAtividadeFormEdit(item);
        break;
      case 1:
        break;
    }
  };

  const renderItem = ({ item: registro }) => (
    <SelectableItem
      item={registro}
      cancelButtonIndex={1}
      options={getOptions}
      onActionSelected={selectOptionsAction}
      onLongPress={() => redirectToRegistroAtividadeFormEdit(registro)}
    >
      <View>
        {isExercicioMusculacao ? (
          <RegistroCarga registroData={registro} />
        ) : (
          <RegistroCardio registroData={registro} />
        )}
      </View>
    </SelectableItem>
  );

  return (
    <View style={container}>
      <View style={header}>
        <Text style={titleStyle}>{nome}</Text>
        <Text style={subtitle}>Registro Completo</Text>
      </View>

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

      <View style={botoesContainer}>
        <BackButton onPress={navigation.goBack} />
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
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default RegistroAtividadesCompleto;
