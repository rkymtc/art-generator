import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  View,  
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ImageSourcePropType
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PromptInput from '../components/form/PromptInput';
import StyleSelector from '../components/logo/StyleSelector';
import CreateButton from '../components/ui/CreateButton';
import { useLogoGeneration } from '../hooks/useLogoGeneration';
import { RootStackParamList } from '../types/navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import useUIState from '../hooks/useUIState';
import usePromptSuggestions from '../hooks/usePromptSuggestions';

import AppHeader from '../components/layout/AppHeader';

import { logoPromptValidation } from '../utils/validation';
import { LOGO_STATUS, ROUTES } from '../utils/constants';
import { colors, spacing } from '../theme';

import BackgroundImage from '../assets/backgrounds/back-gradient.png';

const { width, height } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const InputScreenWrapper: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  return <InputScreen navigation={navigation} />;
};

interface InputScreenProps {
  navigation: NavigationProp;
}

const InputScreen: React.FC<InputScreenProps> = ({ navigation }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('default');
  const { generateLogo, status, error, task, clearLogo } = useLogoGeneration();
  
  const { 
    focusedField, 
    setFocusedField,
    showToast
  } = useUIState();
  
  const { getRandomSuggestion } = usePromptSuggestions();
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const inputRef = useRef<TextInput | null>(null);

  const isLoading = useMemo(() => {
    return status === LOGO_STATUS.PROCESSING || isSubmitting;
  }, [status, isSubmitting]);

  const handleCreate = useCallback(async (): Promise<void> => {
    if (!prompt.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await generateLogo(prompt, selectedStyle);
    } catch (err) {
      console.error('Logo generation error:', err);
      console.log('Logo burası:', err);
      setIsSubmitting(false);
    }
  }, [prompt, selectedStyle, generateLogo]);

  const handleChipPress = useCallback((): void => {
    if (status === LOGO_STATUS.DONE && task?.id) {
      navigation.navigate('LogoDetails', { taskId: task.id });
    } else if (status === LOGO_STATUS.ERROR) {
      Alert.alert('Error', 'Failed to generate logo. Please try again.');
      clearLogo();
    }
  }, [status, navigation, clearLogo, task?.id]);


  const handleSurpriseMe = useCallback((): void => {
    const suggestion = getRandomSuggestion();
    setPrompt(suggestion.text);
  }, [getRandomSuggestion]);

  const dismissKeyboard = useCallback((): void => {
    Keyboard.dismiss();
    if (inputRef.current) {
      inputRef.current.blur();
    }
    setFocusedField(null);
  }, [setFocusedField]);

  const handleStyleChange = useCallback((styleId: string): void => {
    setSelectedStyle(styleId);
  }, []);

  const handlePromptChange = useCallback((text: string): void => {
    setPrompt(text);
  }, []);
  
  const handlePromptFocus = useCallback((): void => {
    setFocusedField('prompt');
  }, [setFocusedField]);
  
  const handlePromptBlur = useCallback((): void => {
    setFocusedField(null);
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  return (
    <ImageBackground 
      source={BackgroundImage as ImageSourcePropType} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardAvoid}
          enabled={Platform.OS === 'ios'}
        >
          <SafeAreaView style={styles.container}>
            <View style={styles.contentWrapper}>
              <View style={styles.mainContent}>
                <AppHeader 
                  status={status} 
                  onChipPress={handleChipPress} 
                />
                
                       
                <PromptInput 
                  value={prompt}
                  onChangeText={handlePromptChange}
                  onFocus={handlePromptFocus}
                  onBlur={handlePromptBlur}
                  focusedField={focusedField || undefined}
                  isProcessing={status === LOGO_STATUS.PROCESSING}
                  errors={!prompt.trim() ? 'Prompt is required' : undefined}
                  touched={!!prompt.trim()}
                  onSurpriseMePress={handleSurpriseMe}
                  placeholder="A blue lion logo reading 'HEXA' in bold letters"
                />
                
                <StyleSelector 
                  selectedStyle={selectedStyle}
                  onSelectStyle={handleStyleChange}
                  isProcessing={status === LOGO_STATUS.PROCESSING}
                  errors={!selectedStyle ? 'Style is required' : undefined}
                  touched={!!selectedStyle}
                />
              </View>
              
              <CreateButton 
                onPress={handleCreate}
                isLoading={isLoading}
                disabled={!prompt.trim() || isLoading}
              />
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'android' ? 40 : 10,
  },
  
  contentWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingBottom: 0,
    position: 'relative',
  },
  mainContent: {
    paddingBottom: 250,
  }
});

export default InputScreenWrapper;