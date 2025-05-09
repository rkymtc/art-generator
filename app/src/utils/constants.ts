import { ThemeColors } from '../types';

export const APP_NAME = 'AI Logo Generator';
export const APP_VERSION = '1.0.0';

export const ROUTES = {
  HOME: 'Home',
  LOGO_DETAILS: 'LogoDetails',
  SETTINGS: 'Settings',
} as const;

export const LOGO_STATUS = {
  IDLE: 'idle',
  PROCESSING: 'processing',
  DONE: 'done',
  ERROR: 'error',
} as const;

export const UI = {
  COLORS: {
    PRIMARY: '#943DFF',
    PRIMARY_DARK: '#2938DC',
    PRIMARY_GRADIENT: ['#943DFF', '#2938DC'],
    BACKGROUND: '#09090B',
    BACKGROUND_LIGHT: '#27272A',
    TEXT: '#FAFAFA',
    TEXT_SECONDARY: 'rgba(250, 250, 250, 0.7)',
    SUCCESS: '#2DCE89',
    ERROR: '#FF3B30',
    BORDER: '#27272A',
    BORDER_ACTIVE: '#FAFAFA',
    INPUT_GRADIENT: ['rgba(148, 61, 255, 0.05)', 'rgba(41, 56, 220, 0.05)'],
  } as ThemeColors,
  FONTS: {
    DEFAULT: {
      REGULAR: 'Manrope-Regular',
      MEDIUM: 'Manrope-Medium',
      SEMIBOLD: 'Manrope-SemiBold',
      BOLD: 'Manrope-Bold',
      EXTRABOLD: 'Manrope-ExtraBold',
    },
  },
  SIZES: {
    BASE: 15,
    RADIUS: 12,
    PADDING: 15,
  },
  ANIMATION: {
    DURATION: 300,
  },
};

export const API = {
  TIMEOUT: 30000,
  RETRY_COUNT: 3,
  LOGO_GENERATION_MIN_TIME: 30000,
  LOGO_GENERATION_MAX_TIME: 60000,
} as const;

export const FEATURES = {
  SHARE_ENABLED: true,
  SURPRISE_ME_ENABLED: true,
  ADVANCED_STYLES_ENABLED: false,
} as const;