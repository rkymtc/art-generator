import { useState } from 'react';

interface ValidationRule {
  required?: boolean;
  maxLength?: number;
  message?: string;
}

interface ValidationSchema {
  [field: string]: ValidationRule;
}

interface FormValues {
  [field: string]: any;
}

interface FormErrors {
  [field: string]: string | null;
}

interface FormTouched {
  [field: string]: boolean;
}

interface UseFormReturn {
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  handleChange: (field: string, value: any) => void;
  handleBlur: (field: string) => void;
  handleFocus: (field: string, setFocusedField?: (field: string) => void) => void;
  resetForm: () => void;
  validateForm: (validationSchema?: ValidationSchema) => boolean;
  setValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

const useForm = (initialValues: FormValues = {}): UseFormReturn => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (field: string, value: any): void => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleBlur = (field: string): void => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleFocus = (field: string, setFocusedField?: (field: string) => void): void => {
    if (setFocusedField) {
      setFocusedField(field);
    }
  };

  const resetForm = (): void => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  const validateForm = (validationSchema?: ValidationSchema): boolean => {
    if (!validationSchema) return true;

    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(validationSchema).forEach(field => {
      const value = values[field];
      const fieldRules = validationSchema[field];

      if (fieldRules.required && (!value || (typeof value === 'string' && !value.trim()))) {
        newErrors[field] = fieldRules.message || 'This field is required';
        isValid = false;
      }

      if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
        newErrors[field] = fieldRules.message || `Maximum length is ${fieldRules.maxLength}`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleBlur,
    handleFocus,
    resetForm,
    validateForm,
    setValues
  };
};

export default useForm;