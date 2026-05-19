import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useContext, useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnuncioBanner from '../../../components/Anuncios/AnuncioBanner';
import AnimatedPressable from '../../../components/Button/AnimatedPressable';
import { colors } from '../../../components/Styles/ComumStyles';
import {
  BANNER_HEIGHT,
  HEADER_SUBTITLE_DASHBOARD,
  HEADER_TITLE_DASHBOARD,
} from '../../../comum/constants';
import { AuthContext } from '../../../context/AuthProvider';
import { useScreenTitle } from '../../../hooks/useScreenTitle';
import * as GradeSemanalApi from '../../gradeSemanal/Api';
import { throwToastError } from '../../utils/toastUtils';
import { useIsAdmin } from '../../utils/userUtils';
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

const MESES_ABREV = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
];

const formatarDataPr = (dateStr) => {
  const [, month, day] = dateStr.split('-');
  return `${parseInt(day, 10)} ${MESES_ABREV[parseInt(month, 10) - 1]}`;
};

const relativeDate = (dateStr) => {
  const [y, m, d] = dateStr.split('-').map(Number);
  const target = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((today - target) / 86400000);
  if (days === 0) return 'Hoje';
  if (days === 1) return 'Ontem';
  if (days > 1 && days < 30) return `Há ${days} dias`;
  return formatarDataPr(dateStr);
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
  const isAdmin = useIsAdmin();

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
  const [treinoHoje, setTreinoHoje] = useState(undefined);

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await DashboardApi.fetchDashboardStats();
      setStats((prev) => ({ ...prev, ...data }));
    } catch {
      throwToastError('Erro ao carregar estatísticas.');
    }
  }, []);

  const fetchTreinoHoje = useCallback(async () => {
    try {
      const { data, status } = await GradeSemanalApi.fetchTreinoHoje();
      if (status === 204 || !data) {
        setTreinoHoje(null);
        return;
      }
      setTreinoHoje(data);
    } catch {
      setTreinoHoje(null);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchStats();
      fetchTreinoHoje();
    }, [fetchStats, fetchTreinoHoje]),
  );

  const renderGreetingSubtitle = () => {
    if (treinoHoje === undefined) {
      return (
        <Text style={dashStyle.greetingSubtitle}>
          Registre seus exercícios e acompanhe sua evolução.
        </Text>
      );
    }
    if (treinoHoje === null) {
      return (
        <Text style={dashStyle.greetingSubtitle}>
          Hoje é dia de{' '}
          <Text style={dashStyle.greetingSubtitleAccent}>descanso</Text>.
        </Text>
      );
    }
    if (treinoHoje.concluidoHoje) {
      return (
        <Text style={dashStyle.greetingSubtitle}>
          Hoje é dia de{' '}
          <Text style={dashStyle.greetingSubtitleAccent}>
            {treinoHoje.treinoNome}
          </Text>
          . <Text style={dashStyle.greetingConcluidoText}>Concluído ✓</Text>
        </Text>
      );
    }
    return (
      <Text style={dashStyle.greetingSubtitle}>
        Hoje é dia de{' '}
        <Text style={dashStyle.greetingSubtitleAccent}>
          {treinoHoje.treinoNome}
        </Text>
        . Vamos lá?
      </Text>
    );
  };

  const podeIniciarTreino = treinoHoje && !treinoHoje.concluidoHoje;

  const renderIniciarTreinoButton = () => {
    if (!podeIniciarTreino) {
      return null;
    }
    return (
      <AnimatedPressable
        testID="btn-iniciar-treino-hoje"
        style={dashStyle.iniciarBtn}
        onPress={() =>
          navigation.navigate('Treinos', {
            screen: 'ListExerciciosTreino',
            params: {
              treino: {
                id: treinoHoje.treinoId,
                nome: treinoHoje.treinoNome,
              },
            },
          })
        }
      >
        <MaterialIcons name="play-arrow" size={18} color={colors.textLight} />
        <Text style={dashStyle.iniciarBtnText}>Iniciar treino de hoje</Text>
      </AnimatedPressable>
    );
  };

  return (
    <View style={dashStyle.screenWrapper}>
      <ScrollView
        style={dashStyle.container}
        contentContainerStyle={[
          dashStyle.scrollContent,
          !isAdmin && { paddingBottom: BANNER_HEIGHT },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero greeting + iniciar treino */}
        <Animated.View entering={FadeInDown.delay(0).duration(400)}>
          <LinearGradient
            colors={['#2a1a1a', colors.inputBackground]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.6]}
            style={dashStyle.greetingCard}
          >
            <Text style={dashStyle.greetingDate}>{formattedDate}</Text>
            <Text style={dashStyle.greetingTitle}>
              {getGreeting()}, {firstName} 👋
            </Text>
            {renderGreetingSubtitle()}
            {renderIniciarTreinoButton()}
          </LinearGradient>
        </Animated.View>

        {/* Stats row */}
        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
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
                {stats.prsEssaSemana != null
                  ? String(stats.prsEssaSemana)
                  : '—'}
              </Text>
              <Text style={dashStyle.statLabel}>{'PRs ESSA\nSEMANA'}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Week dots */}
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <View style={dashStyle.card}>
            <View style={dashStyle.weekHeader}>
              <Text style={dashStyle.weekTitle}>Esta semana</Text>
              <Text style={dashStyle.weekSub}>
                {stats.diasSemana.filter(Boolean).length} / 7 dias
              </Text>
            </View>
            <View style={dashStyle.weekDots}>
              {WEEK_DAYS.map((d, i) => {
                const done = stats.diasSemana[i];
                return (
                  <View key={i} style={dashStyle.dayItem}>
                    <View
                      style={done ? dashStyle.dayDotActive : dashStyle.dayDot}
                    >
                      {done && (
                        <MaterialIcons
                          name="check"
                          size={18}
                          color={colors.textLight}
                        />
                      )}
                    </View>
                    <Text style={dashStyle.dayLabel}>{d}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </Animated.View>

        {/* Recent PRs */}
        <Animated.View entering={FadeInDown.delay(300).duration(400)}>
          <Text style={dashStyle.sectionLabel}>RECORDES RECENTES</Text>
          {stats.recordesRecentes.length === 0 ? (
            <View style={dashStyle.prCard}>
              <View style={dashStyle.prIconWrap}>
                <MaterialIcons
                  name="emoji-events"
                  size={26}
                  color={colors.secondary}
                />
              </View>
              <Text style={dashStyle.prEmptyText}>
                Seus recordes pessoais aparecerão aqui em breve.
              </Text>
            </View>
          ) : (
            stats.recordesRecentes.map((recorde, idx) => {
              const isTopPr = idx === 0;
              return (
                <AnimatedPressable
                  key={`${recorde.exercicioId}-${recorde.variacaoId ?? 'sem'}`}
                  style={
                    isTopPr
                      ? dashStyle.recordeCardAccent
                      : dashStyle.recordeCard
                  }
                  testID={`recorde-card-${recorde.exercicioId}`}
                  onPress={() =>
                    navigation.navigate('RegistroAtividadesCompleto', {
                      exercicio: {
                        id: recorde.exercicioId,
                        nome: recorde.exercicioNome,
                        tipoExercicio: recorde.tipoExercicio,
                        possuiVariacao: recorde.possuiVariacao,
                      },
                      variacaoInicial: recorde.variacaoId
                        ? {
                            id: recorde.variacaoId,
                            nome: recorde.variacaoNome,
                          }
                        : null,
                    })
                  }
                >
                  <View
                    style={
                      isTopPr
                        ? dashStyle.recordeIconWrapAccent
                        : dashStyle.recordeIconWrap
                    }
                  >
                    <MaterialIcons
                      name={isTopPr ? 'emoji-events' : 'trending-up'}
                      size={isTopPr ? 26 : 24}
                      color={isTopPr ? colors.secondary : colors.terciary}
                    />
                  </View>
                  <View style={dashStyle.recordeCardContent}>
                    <Text style={dashStyle.recordeCardNome} numberOfLines={1}>
                      {recorde.exercicioNome}
                    </Text>
                    <Text
                      style={dashStyle.recordeCardSubtitle}
                      numberOfLines={1}
                    >
                      {relativeDate(recorde.dataPr)}
                      {recorde.variacaoNome ? ` · ${recorde.variacaoNome}` : ''}
                    </Text>
                  </View>
                  <Text
                    style={
                      isTopPr
                        ? dashStyle.recordeCardValorTop
                        : dashStyle.recordeCardValor
                    }
                  >
                    {recorde.valorPr}
                  </Text>
                </AnimatedPressable>
              );
            })
          )}
        </Animated.View>
      </ScrollView>

      {/* Sticky ad banner — outside ScrollView, anchors to bottom of screen */}
      <AnuncioBanner />
    </View>
  );
};

export default Dashboard;
