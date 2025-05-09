import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLogoGeneration } from '../../hooks/useLogoGeneration';
import { LOGO_STATUS } from '../../utils/constants';
import { colors, typography, spacing } from '../../theme';

const FALLBACK_IMAGES = [
  'https://placehold.co/600x400/EEE/31343C',
  'https://placehold.co/600x400/3D4DB7/FFFFFF',
  'https://placehold.co/600x400/7209B7/FFFFFF',
];

interface LogoPreviewProps {
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const PREVIEW_SIZE = width - 100;

const isPlaceholderUrl = (url: string): boolean => {
  return url.includes('placeholder.com') || url.includes('placehold.co');
};

const LogoPreview: React.FC<LogoPreviewProps> = ({ onPress }) => {
  const { logo, status } = useLogoGeneration();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [imageSource, setImageSource] = useState<string | null>(null);
  
  useEffect(() => {
    if (logo) {
      setImageSource(logo);
      setImageError(false);
      setImageLoading(true);
    }
  }, [logo]);
  
  if (status !== LOGO_STATUS.DONE || !imageSource) {
    return null;
  }
  
  const handleImageError = () => {
    console.error('Failed to load image:', imageSource);
    setImageLoading(false);
    
    if (isPlaceholderUrl(imageSource)) {
      const randomIndex = Math.floor(Math.random() * FALLBACK_IMAGES.length);
      const fallbackImage = FALLBACK_IMAGES[randomIndex];
      setImageSource(fallbackImage);
    } else {
      setImageError(true);
    }
  };
  
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.previewContainer}>
        {imageLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading image...</Text>
          </View>
        )}
        
        {imageError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Failed to load image</Text>
          </View>
        )}
        
        <Image 
          source={{ uri: imageSource }} 
          style={[styles.logoImage, (imageLoading || imageError) && styles.hiddenImage]}
          resizeMode="contain"
          onLoadStart={() => setImageLoading(true)}
          onLoad={() => setImageLoading(false)}
          onError={handleImageError}
        />
      </View>
      <LinearGradient
        colors={['#943DFF', '#2938DC']}
        locations={[0.2459, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.tapToViewButton}
      >
        <Text style={styles.tapToViewText}>Tap to view full design</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.primary,
    fontSize: typography.body.fontSize,
    fontWeight: 'bold',
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: colors.error,
    fontSize: typography.body.fontSize,
    fontWeight: 'bold',
  },
  logoImage: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
  },
  hiddenImage: {
    opacity: 0,
  },
  tapToViewButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tapToViewText: {
    color: colors.background,
    fontSize: typography.body.fontSize,
    fontWeight: 'bold',
  },
});

export default LogoPreview; 