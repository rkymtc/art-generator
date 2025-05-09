export interface LogoStyle {
  id: string;
  label: string;
  description: string;
  supportsMono: boolean;
  backgroundColor?: string;
  gradient?: string[];
}

export interface StyleBackground {
  color?: string;
  gradient?: string[];
}

export const LOGO_STYLES: LogoStyle[] = [
  { 
    id: 'no-style', 
    label: 'No Style',
    description: 'A simple, clean logo without any specific styling',
    supportsMono: true
  },
  { 
    id: 'monogram', 
    label: 'Monogram',
    description: 'A stylish monogram logo, typically using letter forms',
    supportsMono: true,
    backgroundColor: '#f5f5f5'
  },
  { 
    id: 'abstract', 
    label: 'Abstract',
    description: 'An abstract, modern logo using shapes and patterns',
    supportsMono: false,
    gradient: ['#6C5CE7', '#a29bfe'],
  },
  { 
    id: 'mascot', 
    label: 'Mascot',
    description: 'A character-based logo that represents your brand',
    supportsMono: false,
    backgroundColor: '#037c54'
  }
];


export const getStyleById = (styleId: string): LogoStyle | null => {
  return LOGO_STYLES.find(style => style.id === styleId) || null;
};


export const formatStyleName = (styleId: string): string => {
  const style = getStyleById(styleId);
  return style ? style.label : styleId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const supportsMono = (styleId: string): boolean => {
  const style = getStyleById(styleId);
  return style ? !!style.supportsMono : false;
};


export const getStyleBackground = (styleId: string): StyleBackground => {
  const style = getStyleById(styleId);
  
  if (!style) {
    return { color: '#1E1E1E' };
  }
  
  if (style.gradient) {
    return { gradient: style.gradient };
  }
  
  return { color: style.backgroundColor || '#1E1E1E' };
}; 