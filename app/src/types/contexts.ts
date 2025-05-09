import { Logo, LogoTask } from './logo';

export interface LogoGenerationContextType {
  state: {
    isLoading: boolean;
    error: string | null;
    currentLogo: LogoTask | null;
    savedLogos: Logo[];
  };
  generateLogo: (prompt: string, style?: string) => Promise<LogoTask>;
  saveLogo: (logo: Logo) => void;
  resetState: () => void;
}

export interface LogoGenerationProviderProps {
  children: React.ReactNode;
}

export interface StyleSelectorProps {
  selectedStyle: string;
  onSelectStyle: (styleId: string) => void;
  isProcessing?: boolean;
  errors?: string;
  touched?: boolean;
} 