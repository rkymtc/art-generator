export interface ToastConfig {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export interface UseUIStateReturn {
  showToast: (config: ToastConfig) => void;
  hideToast: () => void;
  toast: ToastConfig | null;
}

export interface ThemeColors {
  PRIMARY: string;
  PRIMARY_DARK: string;
  PRIMARY_GRADIENT: string[];
  BACKGROUND: string;
  BACKGROUND_LIGHT: string;
  TEXT: string;
  TEXT_SECONDARY: string;
  SUCCESS: string;
  ERROR: string;
  BORDER: string;
  BORDER_ACTIVE: string;
  INPUT_GRADIENT: string[];
}

export type ThemeType = 'light' | 'dark';

export interface AppSettings {
  theme: ThemeType;
  notifications: boolean;
  language: string;
}

export interface StatusChipProps {
  status: 'processing' | 'done' | 'error';
  text?: string;
  onPress?: () => void;
}

export interface CreateButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  text?: string;
}

export interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
} 