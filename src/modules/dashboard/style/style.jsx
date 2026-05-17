import { StyleSheet } from 'react-native';
import { colors } from '../../../components/Styles/ComumStyles';

export default StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 60,
  },

  // Greeting card
  greetingCard: {
    backgroundColor: '#2a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  greetingDate: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.placeholderText,
    letterSpacing: 2,
    marginBottom: 4,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textLight,
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontSize: 13,
    color: colors.placeholderText,
    lineHeight: 18,
  },

  // Stats row
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  statValueAccent: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.secondary,
    marginBottom: 2,
  },
  statValueNeutral: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textLight,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.placeholderText,
    letterSpacing: 1,
    textAlign: 'center',
  },

  // Generic card
  card: {
    backgroundColor: colors.inputBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },

  // Week section
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  weekTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textLight,
  },
  weekSub: {
    fontSize: 12,
    color: colors.placeholderText,
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
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayDotActive: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayLabel: {
    fontSize: 11,
    color: colors.placeholderText,
    fontWeight: '600',
    marginTop: 6,
  },

  // PRs section
  sectionLabel: {
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: '700',
    color: '#888',
    marginBottom: 8,
    paddingLeft: 4,
  },
  prCard: {
    backgroundColor: colors.inputBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  prIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(255,85,85,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prEmptyText: {
    flex: 1,
    fontSize: 13,
    color: colors.textHint,
    lineHeight: 20,
  },
});
