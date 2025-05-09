export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: any) => boolean | string;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export interface FormValues {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface FormTouched {
  [key: string]: boolean;
}

export interface UseFormReturn {
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  handleChange: (name: string, value: any) => void;
  handleBlur: (name: string) => void;
  handleSubmit: (e?: React.FormEvent) => void;
  reset: () => void;
  isValid: boolean;
  isDirty: boolean;
}

export interface PromptInputProps {
  value: string;
  onChange: (text: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  errorMessage?: string;
  disabled?: boolean;
}

export interface PromptSuggestion {
  id: string;
  text: string;
  category?: string;
}

export interface UsePromptSuggestionsReturn {
  suggestions: PromptSuggestion[];
  loading: boolean;
  error: string | null;
} 