import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import AnuncioBanner from '../../../components/Anuncios/AnuncioBanner';
import { colors } from '../../../components/Styles/ComumStyles';
import {
  HEADER_SUBTITLE_DASHBOARD,
  HEADER_TITLE_DASHBOARD,
} from '../../../comum/constants';
import { useScreenTitle } from '../../../hooks/useScreenTitle';
import dashStyle from '../style/style';

const WEEK_DAYS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

const Dashboard = () => {
  useScreenTitle(HEADER_TITLE_DASHBOARD, HEADER_SUBTITLE_DASHBOARD);

  return (
    <ScrollView
      style={dashStyle.container}
      contentContainerStyle={dashStyle.scrollContent}
    >
      {/* Greeting card */}
      <View style={dashStyle.greetingCard}>
        <Text style={dashStyle.greetingDate}>BEM-VINDO AO GYMLOAD</Text>
        <Text style={dashStyle.greetingTitle}>Vamos treinar hoje? 💪</Text>
        <Text style={dashStyle.greetingSubtitle}>
          Registre seus exercícios e acompanhe sua evolução.
        </Text>
      </View>

      {/* Stats row (placeholder) */}
      <View style={dashStyle.statsRow}>
        <View style={dashStyle.statCard}>
          <Text style={dashStyle.statValue}>—</Text>
          <Text style={dashStyle.statLabel}>STREAK</Text>
        </View>
        <View style={dashStyle.statCard}>
          <Text style={dashStyle.statValue}>—</Text>
          <Text style={dashStyle.statLabel}>TREINOS/MÊS</Text>
        </View>
        <View style={dashStyle.statCard}>
          <Text style={dashStyle.statValue}>—</Text>
          <Text style={dashStyle.statLabel}>PRs</Text>
        </View>
      </View>

      {/* Week dots */}
      <View style={dashStyle.card}>
        <View style={dashStyle.weekHeader}>
          <Text style={dashStyle.weekTitle}>Esta semana</Text>
          <Text style={dashStyle.weekSub}>Em breve</Text>
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

      {/* Ad banner */}
      <AnuncioBanner posicao="top" />

      {/* Coming soon notice */}
      <View style={dashStyle.wipCard}>
        <Text style={dashStyle.wipText}>
          Dashboard em desenvolvimento — mais estatísticas em breve!
        </Text>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
