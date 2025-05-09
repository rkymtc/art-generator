import React, { ReactElement, useEffect } from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import app from './src/config/firebase';
import { LogoGenerationProvider } from './src/hooks/useLogoGeneration';

export default function App(): ReactElement | null {
  const [fontsLoaded, fontError] = useFonts({
    'Manrope-Regular': Manrope_400Regular,
    'Manrope-Medium': Manrope_500Medium,
    'Manrope-SemiBold': Manrope_600SemiBold,
    'Manrope-Bold': Manrope_700Bold,
    'Manrope-ExtraBold': Manrope_800ExtraBold,
  });

  useEffect(() => {
    if (fontError) console.error('Font loading error:', fontError);
  }, [fontError]);

  

  if (!fontsLoaded) return null;

  return (
    <LogoGenerationProvider>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </LogoGenerationProvider>
  );
}
