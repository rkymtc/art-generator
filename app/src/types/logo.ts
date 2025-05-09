export interface Logo {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: Date;
  favorite?: boolean;
}

export interface LogoTask {
  id: string;
  prompt: string;
  style?: string;
  status: 'processing' | 'done' | 'error';
  error?: string;
  imageUrl?: string;
  createdAt: Date;
  completedAt?: Date;
  updatedAt?: Date;
}

export interface LogoGenerationState {
  isLoading: boolean;
  error: string | null;
  generatedLogos: Logo[];
  favoriteLogos: Logo[];
}

export interface LogoCache {
  currentTask: LogoTask | null;
  timer: NodeJS.Timeout | null;
}

export interface LogoStyle {
  id: string;
  name: string;
  icon: string;
  description: string;
  previewImage?: string;
}

export interface StyleBackground {
  colors: string[];
  type: 'linear' | 'radial';
}

export interface LogoStyleProps {
  style: string;
  selected: boolean;
  onSelect: (style: string) => void;
} 