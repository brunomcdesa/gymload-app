import React, { useContext, useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AnuncioBanner from '../../../components/Anuncios/AnuncioBanner';
import { colors } from '../../../components/Styles/ComumStyles';
import {
  HEADER_SUBTITLE_DASHBOARD,
  HEADER_TITLE_DASHBOARD,
} from '../../../comum/constants';
import { AuthContext } from '../../../context/AuthProvider';
import { useScreenTitle } from '../../../hooks/useScreenTitle';
import dashStyle from '../style/style';

const WEEK_DAYS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

const DIAS_PT = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];
const MESES_PT = [
  'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
  'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO',
];

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
};

const Dashboard = () => {
  useScreenTitle(HEADER_TITLE_DASHBOARD, HEADER_SUBTITLE_DASHBOARD);
  const { user } = useContext(AuthContext);

  const firstName = user?.nome?.split(' ')[0] ?? 'Atleta';

  const formattedDate = useMemo(() => {
    const now = new Date();
    return `${DIAS_PT[now.getDay()]}, ${now.getDate()} DE ${MESES_PT[now.getMonth()]}`;
  }, []);

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
          <Text style={dashStyle.greetingTitle}>{getGreeting()}, {firstName} 👋</Text>
          <Text style={dashStyle.greetingSubtitle}>
            Registre seus exercícios e acompanhe sua evolução.
          </Text>
        </View>

        {/* Stats row (placeholder) */}
        <View style={dashStyle.statsRow}>
          <View style={dashStyle.statCard}>
            <Text style={dashStyle.statValueAccent}>—</Text>
            <Text style={dashStyle.statLabel}>STREAK</Text>
          </View>
          <View style={dashStyle.statCard}>
            <Text style={dashStyle.statValueNeutral}>—</Text>
            <Text style={dashStyle.statLabel}>TREINOS/MÊS</Text>
          </View>
          <View style={dashStyle.statCard}>
            <Text style={dashStyle.statValueNeutral}>—</Text>
            <Text style={dashStyle.statLabel}>{'PRs ESSA\nSEMANA'}</Text>
          </View>
        </View>

        {/* Week dots */}
        <View style={dashStyle.card}>
          <View style={dashStyle.weekHeader}>
            <Text style={dashStyle.weekTitle}>Esta semana</Text>
            <Text style={dashStyle.weekSub}>0 / 7 dias</Text>
          </View>
          <View style={dashStyle.weekDots}>
            {WEEK_DAYS.map((d, i) => (
              <View key={i} style={dashStyle.dayItem}>
                <View style={dashStyle.dayDot} />
                <Text style={dashStyle.dayLabel}>{d}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent PRs — empty state */}
        <Text style={dashStyle.sectionLabel}>RECORDES RECENTES</Text>
        <View style={dashStyle.prCard}>
          <View style={dashStyle.prIconWrap}>
            <MaterialIcons name="emoji-events" size={26} color={colors.secondary} />
          </View>
          <Text style={dashStyle.prEmptyText}>
            Seus recordes pessoais aparecerão aqui em breve.
          </Text>
        </View>
      </ScrollView>

      {/* Sticky ad banner — outside ScrollView, anchors to bottom of screen */}
      <AnuncioBanner />
    </View>
  );
};

export default Dashboard;
