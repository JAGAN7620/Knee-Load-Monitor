/**
 * Design Tokens for KneeLoad Monitor
 * Premium Navy + Burnt Orange Biomechanics Analytics System
 */

export const THEME_COLORS = {
  primaryNavy: '#172B4D',
  secondaryNavy: '#243B5A',

  primaryOrange: '#E87532',
  secondaryOrange: '#F59E5B',
  paleOrange: '#FFF1E8',
  orangeHover: '#D46222',

  pageBackground: '#F7F8FA',
  cardBackground: '#FFFFFF',

  primaryText: '#202B3C',
  secondaryText: '#718096',
  mutedText: '#A0AEC0',

  border: '#E5E7EB',
  borderSubtle: '#F3F4F6',
  borderStrong: '#D1D5DB',

  success: '#16A36A',

  status: {
    normal: {
      color: '#16A36A',
      bg: '#ECFDF5',
      border: '#A7F3D0',
    },
    warning: {
      color: '#B45309',
      bg: '#FFFBEB',
      border: '#FDE68A',
    },
    critical: {
      color: '#B91C1C',
      bg: '#FEF2F2',
      border: '#FECACA',
    },
    neutral: {
      color: '#475569',
      bg: '#F8FAFC',
      border: '#E2E8F0',
    },
  },
} as const;

/**
 * Chart-ready color palette for Recharts
 * Rule: Orange for model estimates, Navy for reference/lab values
 */
export const CHART_THEME = {
  modelEstimate: '#E87532',      // Primary Orange (Model estimate)
  modelEstimateSecondary: '#F59E5B', // Secondary Orange
  referenceLab: '#172B4D',       // Primary Navy (Reference / Lab ground truth)
  secondaryNavy: '#243B5A',      // Secondary Navy
  gridLines: '#E5E7EB',          // Light Border
  axisLabels: '#718096',         // Secondary Text
  tooltipBg: '#FFFFFF',
  tooltipBorder: '#E5E7EB',
  success: '#16A36A',
} as const;
