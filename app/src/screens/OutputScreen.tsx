import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Share,
  Alert,
  ImageBackground,
  Dimensions,
  ImageSourcePropType,
  Animated,
  Platform,
  Clipboard,
  ActivityIndicator
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import useLogoGeneration from '../hooks/useLogoGeneration';
import useUIState from '../hooks/useUIState';

import { formatStyleName } from '../utils/logoStyles';
import { LOGO_STATUS, UI, ROUTES } from '../utils/constants';
import { RootStackParamList } from '../types';
import { colors, typography, spacing } from '../theme';

import BackgroundImage from '../assets/backgrounds/back-gradient.png';
import CloseIcon from '../assets/icons/cancel-01.svg';
import CopyIcon from '../assets/icons/copy.svg';

const { width, height } = Dimensions.get('window');

type OutputScreenProps = {
  navigation: any;
  route: {
    params: {
      taskId: string;
    }
  }
}

const OutputScreen: React.FC<OutputScreenProps> = ({ navigation, route }) => {
  const { task, logo, status, clearLogo } = useLogoGeneration();
  const { showToast } = useUIState();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    if (!task && route.params?.taskId) {
      console.log("Need to load task from taskId:", route.params.taskId);
      // Here you could load the task data if needed
    }

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, task, route.params]);
  
  const handleBack = (): void => {
    navigation.navigate('Home');
    setTimeout(() => {
      clearLogo();
    }, 100);
  };

  const handleCopy = async (): Promise<void> => {
    if (task?.prompt) {
      await Clipboard.setString(task.prompt);
      showToast('Prompt copied to clipboard!', 'success');
    }
  };
  
  if (status === LOGO_STATUS.ERROR) {
    return (
      <ImageBackground 
        source={BackgroundImage as ImageSourcePropType} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>Oops, something went wrong!</Text>
            <Text style={styles.errorText}>{task?.error || 'Failed to generate logo'}</Text>
            <LinearGradient
              colors={UI.COLORS.PRIMARY_GRADIENT}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.backButton}
            >
              <TouchableOpacity 
                style={styles.buttonInner}
                onPress={handleBack}
              >
                <Text style={styles.backButtonText}>Try Again</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
  
  if (!task || !logo) {
    return (
      <ImageBackground 
        source={BackgroundImage as ImageSourcePropType} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No logo generated yet.</Text>
            <LinearGradient
              colors={UI.COLORS.PRIMARY_GRADIENT}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.backButton}
            >
              <TouchableOpacity 
                style={styles.buttonInner}
                onPress={handleBack}
              >
                <Text style={styles.backButtonText}>Back to Input</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  }
  
  return (
    <ImageBackground 
      source={BackgroundImage as ImageSourcePropType} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Your Design</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleBack}>
              <CloseIcon width={24} height={24} fill={UI.COLORS.TEXT} />
            </TouchableOpacity>
          </View>
          
          <Animated.View 
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
              }
            ]}
          >
            {imageLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.white} />
                <Text style={styles.loadingText}>Loading image...</Text>
              </View>
            )}
            
            {imageError && (
              <View style={styles.errorImageContainer}>
                <Text style={styles.errorImageText}>Failed to load image</Text>
                <TouchableOpacity 
                  style={styles.retryButton}
                  onPress={() => {
                    setImageLoading(true);
                    setImageError(false);
                  }}
                >
                  <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
              </View>
            )}
            
            <Image 
              source={{ uri: logo }} 
              style={[styles.logoImage, (imageLoading || imageError) ? styles.hiddenImage : null]}
              resizeMode="cover"
              onLoadStart={() => setImageLoading(true)}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                setImageLoading(false);
                setImageError(true);
                console.error('Failed to load image:', logo);
              }}
            />
          </Animated.View>
          
          <View style={styles.detailsContainer}>
            <LinearGradient
              colors={[UI.COLORS.BACKGROUND_LIGHT, UI.COLORS.BACKGROUND_LIGHT]}
              start={{ x: 0, y: 0 }}  
              end={{ x: 0, y: 1 }}
              style={styles.detailItem}
            >   
              <LinearGradient
                colors={UI.COLORS.INPUT_GRADIENT}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientInner}
              >
                <View style={styles.detailHeader}>
                  <Text style={styles.detailLabel}>Prompt</Text>
                  <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
                    <CopyIcon width={20} height={20} />
                    <Text style={styles.copyText}>Copy</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.detailText}>{task?.prompt}</Text>
                <View style={styles.styleTag}>
                  <Text style={styles.styleTagText}>{task?.style || 'Default'}</Text>
                </View>
              </LinearGradient>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: UI.COLORS.TEXT,
    fontFamily: UI.FONTS.DEFAULT.BOLD,
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(250, 250, 250, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    backgroundColor: '#333',
    position: 'relative',
  },
  logoImage: {
    width: '100%',
    height: width-88,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  hiddenImage: {
    opacity: 0,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 2,
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.white,
    fontSize: 16,
    fontFamily: UI.FONTS.DEFAULT.MEDIUM,
  },
  errorImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  },
  errorImageText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: UI.FONTS.DEFAULT.MEDIUM,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: UI.COLORS.PRIMARY,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: UI.FONTS.DEFAULT.BOLD,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  detailItem: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(45, 45, 55, 0.8)',
  },
  gradientInner: {
    padding: 16,
    borderRadius: 12,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 17,
    color: UI.COLORS.TEXT,
    fontFamily: UI.FONTS.DEFAULT.MEDIUM,
    fontWeight: '600',
  },
  detailText: {
    fontSize: 17,
    color: UI.COLORS.TEXT,
    fontFamily: UI.FONTS.DEFAULT.REGULAR,
    lineHeight: 24,
    marginBottom: 12,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'transparent',
  },
  copyText: {
    color: 'rgba(235, 235, 245, 0.6)',
    fontSize: 17,
    fontFamily: UI.FONTS.DEFAULT.REGULAR,
  },
  styleTag: {
    backgroundColor: 'rgba(235, 235, 245, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  styleTagText: {
    color: UI.COLORS.TEXT,
    fontSize: 15,
    fontFamily: UI.FONTS.DEFAULT.REGULAR,
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
    gap: 12,
  },
  actionButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  buttonText: {
    color: UI.COLORS.TEXT,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: UI.FONTS.DEFAULT.BOLD,
  },
  buttonIcon: {
    marginLeft: 8,
  },
  backButtonText: {
    color: UI.COLORS.TEXT,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: UI.FONTS.DEFAULT.BOLD,
  },
  errorContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: UI.COLORS.ERROR,
    marginBottom: 12,
    textAlign: 'center',
    fontFamily: UI.FONTS.DEFAULT.BOLD,
  },
  errorText: {
    fontSize: 16,
    color: UI.COLORS.TEXT,
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: UI.FONTS.DEFAULT.REGULAR,
    lineHeight: 24,
  },
  backButton: {
    borderRadius: 12,
    overflow: 'hidden',
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

export default OutputScreen; 