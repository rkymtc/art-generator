import React from 'react';
import { View, TextInput, Button, Image, Text, StyleSheet } from 'react-native';
import { StyleSelector } from './StyleSelector';
import { useLogoGeneration } from '../hooks/useLogoGeneration';

export const LogoGenerator = () => {
  const {
    prompt,
    setPrompt,
    style,
    setStyle,
    logo,
    error,
    isGenerating,
    generateLogo,
  } = useLogoGeneration();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={prompt}
        onChangeText={setPrompt}
        placeholder="Enter logo description"
      />
      
      <StyleSelector
        selectedStyle={style}
        onStyleSelect={setStyle}
      />
      
      <Button
        title="Generate Logo"
        onPress={generateLogo}
        disabled={!prompt || isGenerating}
      />

      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      {isGenerating && (
        <Text style={styles.status}>Generating your logo...</Text>
      )}

      {logo?.status === 'done' && logo.imageUrl && (
        <Image
          source={{ uri: logo.imageUrl }}
          style={styles.logo}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  logo: {
    width: '100%',
    height: 300,
    marginTop: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  status: {
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
}); 