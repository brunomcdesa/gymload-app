import { StyleSheet } from 'react-native';
import { colors } from '../../../components/Styles/ComumStyles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  greetingCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#383838',
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  greetingDate: {
    fontSize: 11,
    fontWeight: '700',
    color: '#888',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 6,
  },
  greetingSubtitle: {
    fontSize: 13,
    color: '#aaa',
    lineHeight: 18,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#383838',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.secondary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#888',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#383838',
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  weekTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  weekSub: {
    fontSize: 12,
    color: '#666',
  },
  weekDots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    alignItems: 'center',
    flex: 1,
  },
  dayDot: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#333',
    marginBottom: 6,
  },
  dayLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
  },
  wipCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 14,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#383838',
    borderStyle: 'dashed',
  },
  wipText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
});
