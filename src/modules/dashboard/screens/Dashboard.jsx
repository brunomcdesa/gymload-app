import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnuncioBanner from '../../../components/Anuncios/AnuncioBanner';
import { colors } from '../../../components/Styles/ComumStyles';
import {
  HEADER_SUBTITLE_DASHBOARD,
  HEADER_TITLE_DASHBOARD,
} from '../../../comum/constants';
import { AuthContext } from '../../../context/AuthProvider';
import { useScreenTitle } from '../../../hooks/useScreenTitle';
import { throwToastError } from '../../utils/toastUtils';
import * as DashboardApi from '../Api';
import dashStyle from '../style/style';

const WEEK_DAYS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

const DIAS_PT = [
  'DOMINGO',
  'SEGUNDA',
  'TERÇA',
  'QUARTA',
  'QUINTA',
  'SEXTA',
  'SÁBADO',
];
const MESES_PT = [
  'JANEIRO',
  'FEVEREIRO',
  'MARÇO',
  'ABRIL',
  'MAIO',
  'JUNHO',
  'JULHO',
  'AGOSTO',
  'SETEMBRO',
  'OUTUBRO',
  'NOVEMBRO',
  'DEZEMBRO',
];

const MESES_ABREV = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];

const formatarDataPr = (dateStr) => {
  const [, month, day] = dateStr.split('-');
  return `${parseInt(day, 10)} ${MESES_ABREV[parseInt(month, 10) - 1]}`;
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
};

const Dashboard = () => {
  useScreenTitle(HEADER_TITLE_DASHBOARD, HEADER_SUBTITLE_DASHBOARD);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const firstName = user?.nome?.split(' ')[0] ?? 'Atleta';

  const formattedDate = useMemo(() => {
    const now = new Date();
    return `${DIAS_PT[now.getDay()]}, ${now.getDate()} DE ${MESES_PT[now.getMonth()]}`;
  }, []);

  const [stats, setStats] = useState({
    streak: null,
    treinosMes: null,
    diasSemana: Array(7).fill(false),
    prsEssaSemana: null,
    recordesRecentes: [],
  });

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await DashboardApi.fetchDashboardStats();
      setStats((prev) => ({ ...prev, ...data }));
    } catch {
      throwToastError('Erro ao carregar estatísticas.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchStats();
    }, [fetchStats]),
  );

  return (
    <View style={dashStyle.screenWrapper}>
      <ScrollView
        style={dashStyle.container}
        contentContainerStyle={dashStyle.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero greeting */}
        <View style={dashStyle.greetingCard}>
          <Text style={dashStyle.greetingDate}>{formattedDate}</Text>
          <Text style={dashStyle.greetingTitle}>
            {getGreeting()}, {firstName} 👋
          </Text>
          <Text style={dashStyle.greetingSubtitle}>
            Registre seus exercícios e acompanhe sua evolução.
          </Text>
        </View>

        {/* Stats row */}
        <View style={dashStyle.statsRow}>
          <View style={dashStyle.statCard}>
            <Text style={dashStyle.statValueAccent}>
              {stats.streak != null ? String(stats.streak) : '—'}
            </Text>
            <Text style={dashStyle.statLabel}>STREAK</Text>
          </View>
          <View style={dashStyle.statCard}>
            <Text style={dashStyle.statValueNeutral}>
              {stats.treinosMes != null ? String(stats.treinosMes) : '—'}
            </Text>
            <Text style={dashStyle.statLabel}>TREINOS/MÊS</Text>
          </View>
          <View style={dashStyle.statCard}>
            <Text style={dashStyle.statValueNeutral}>
              {stats.prsEssaSemana != null ? String(stats.prsEssaSemana) : '—'}
            </Text>
            <Text style={dashStyle.statLabel}>{'PRs ESSA\nSEMANA'}</Text>
          </View>
        </View>

        {/* Week dots */}
        <View style={dashStyle.card}>
          <View style={dashStyle.weekHeader}>
            <Text style={dashStyle.weekTitle}>Esta semana</Text>
            <Text style={dashStyle.weekSub}>
              {stats.diasSemana.filter(Boolean).length} / 7 dias
            </Text>
          </View>
          <View style={dashStyle.weekDots}>
            {WEEK_DAYS.map((d, i) => (
              <View key={i} style={dashStyle.dayItem}>
                <View
                  style={
                    stats.diasSemana[i]
                      ? dashStyle.dayDotActive
                      : dashStyle.dayDot
                  }
                />
                <Text style={dashStyle.dayLabel}>{d}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent PRs */}
        <Text style={dashStyle.sectionLabel}>RECORDES RECENTES</Text>
        {stats.recordesRecentes.length === 0 ? (
          <View style={dashStyle.prCard}>
            <View style={dashStyle.prIconWrap}>
              <MaterialIcons name="emoji-events" size={26} color={colors.secondary} />
            </View>
            <Text style={dashStyle.prEmptyText}>
              Seus recordes pessoais aparecerão aqui em breve.
            </Text>
          </View>
        ) : (
          stats.recordesRecentes.map((recorde) => (
            <TouchableOpacity
              key={recorde.exercicioId}
              style={dashStyle.recordeCard}
              testID={`recorde-card-${recorde.exercicioId}`}
              onPress={() =>
                navigation.navigate('RegistroAtividadesCompleto', {
                  exercicio: {
                    id: recorde.exercicioId,
                    nome: recorde.exercicioNome,
                    tipoExercicio: recorde.tipoExercicio,
                    possuiVariacao: false,
                  },
                })
              }
              activeOpacity={0.75}
            >
              <MaterialIcons name="emoji-events" size={16} color={colors.secondary} />
              <View style={dashStyle.recordeCardContent}>
                <Text style={dashStyle.recordeCardNome} numberOfLines={1}>
                  {recorde.exercicioNome}
                </Text>
                <Text style={dashStyle.recordeCardValor}>{recorde.valorPr}</Text>
              </View>
              <Text style={dashStyle.recordeCardData}>
                {formatarDataPr(recorde.dataPr)}
              </Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Sticky ad banner — outside ScrollView, anchors to bottom of screen */}
      <AnuncioBanner />
    </View>
  );
};

export default Dashboard;
