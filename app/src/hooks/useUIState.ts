import { useState, useCallback } from 'react';

type ToastType = 'info' | 'success' | 'error' | 'warning';

interface ToastConfig {
  visible: boolean;
  message: string;
  type: ToastType;
}

interface UseUIStateReturn {
  focusedField: string | null;
  setFocusedField: (field: string | null) => void;
  isSurpriseModalVisible: boolean;
  setSurpriseModalVisible: (visible: boolean) => void;
  toggleSurpriseModal: () => void;
  isShareModalVisible: boolean;
  setShareModalVisible: (visible: boolean) => void;
  toggleShareModal: () => void;
  toastConfig: ToastConfig;
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  hideToast: () => void;
}

const useUIState = (): UseUIStateReturn => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSurpriseModalVisible, setSurpriseModalVisible] = useState<boolean>(false);
  const [isShareModalVisible, setShareModalVisible] = useState<boolean>(false);
  const [toastConfig, setToastConfig] = useState<ToastConfig>({ visible: false, message: '', type: 'info' });

  const showToast = useCallback((message: string, type: ToastType = 'info', duration: number = 3000): void => {
    setToastConfig({ visible: true, message, type });
    
    setTimeout(() => {
      setToastConfig(prev => ({ ...prev, visible: false }));
    }, duration);
  }, []);

  const hideToast = useCallback((): void => {
    setToastConfig(prev => ({ ...prev, visible: false }));
  }, []);

  const toggleSurpriseModal = useCallback((): void => {
    setSurpriseModalVisible(prev => !prev);
  }, []);

  const toggleShareModal = useCallback((): void => {
    setShareModalVisible(prev => !prev);
  }, []);

  return {
    focusedField,
    setFocusedField,
    isSurpriseModalVisible,
    setSurpriseModalVisible,
    toggleSurpriseModal,
    isShareModalVisible,
    setShareModalVisible,
    toggleShareModal,
    toastConfig,
    showToast,
    hideToast
  };
};

export default useUIState; 