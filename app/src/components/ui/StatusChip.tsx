import React, { useState, useEffect, ReactElement } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, ActivityIndicator, Image, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useLogoGeneration } from '../../hooks/useLogoGeneration';
import { LOGO_STATUS } from '../../utils/constants';
import { StatusChipProps } from '../../types/ui';
import { colors, typography, spacing } from '../../theme';

const StatusChip: React.FC<StatusChipProps> = ({ status, onPress }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(2);
  const isProcessing = status === LOGO_STATUS.PROCESSING;
  const isError = status === LOGO_STATUS.ERROR;
  const isDone = status === LOGO_STATUS.DONE;
  const { logo } = useLogoGeneration();
  
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isProcessing) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 0) return 0;
          return prev - 1;
        });
      }, 6000); 
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isProcessing]);
  
  const getChipContent = (): ReactElement => {
    if (isProcessing) {
      return (
        <>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={colors.white} />
          </View>
          <LinearGradient 
            colors={['#27272A', '#27272A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.processingTextContainer}
          >
            <LinearGradient
              colors={['rgba(148, 61, 255, 0.05)', 'rgba(41, 56, 220, 0.05)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.innerGradient}
            >
              <View style={styles.textContainer}>
                <Text style={styles.text}>Creating Your Design...</Text>
                <Text style={styles.timeText}>Ready in {timeRemaining} minutes</Text>
              </View>
            </LinearGradient>
          </LinearGradient>
        </>
      );
    } else if (isError) {
      return (
        <>
          <View style={styles.errorIconContainer}>
            <View style={styles.errorIcon}>
              <Text style={styles.errorIconText}>!</Text>
            </View>
          </View>
          <View style={styles.errorTextContainer}>
            <Text style={styles.text}>Oops, something went wrong!</Text>
            <Text style={styles.timeText}>Click to try again</Text>
          </View>
        </>
      );
    } else {
      return (
        <>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: logo || undefined } as ImageSourcePropType} 
              style={styles.logoPreview} 
              resizeMode="contain"
            />
          </View>
          <LinearGradient 
            colors={['#943DFF', '#2938DC']}
            locations={[0.2459, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.successTextContainer}
          >
            <Text style={styles.text}>Your Design is Ready!</Text>
            <Text style={styles.timeText}>Tap to see it</Text>
          </LinearGradient>
        </>
      );
    }
  };
  
  return (
    <TouchableOpacity 
      style={[styles.container, isDone && styles.containerDone]}
      onPress={onPress}
      disabled={isProcessing}
      activeOpacity={isDone ? 0.8 : 1}
    >
      {getChipContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    marginVertical: spacing.sm,
    overflow: 'hidden',
  },
  containerDone: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    transform: [{scale: 1.02}],
  },
  loaderContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#18181B',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  processingTextContainer: {
    flex: 1,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    width: 70,
    height: 70,
  },
  innerGradient: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  logoContainer: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  successTextContainer: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    width: 70,
    height: 70,
  },
  errorIconContainer: {
    width: 70,
    height: 70,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  errorTextContainer: {
    flex: 1,
    backgroundColor: '#EF4444B2',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    width: 70,
    height: 70,
  },
  textContainer: {
    flex: 1,
  },
  logoPreview: {
    width: 70,
    height: 70,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  errorIcon: {
    width: 35,
    height: 35,
    borderRadius: 35/2,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorIconText: {
    color: '#EF4444',
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    color: '#FAFAFA',
    fontSize: 16,
    fontFamily: 'Manrope',
    fontWeight: '800',
    lineHeight: 21,
    letterSpacing: -0.16,
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: typography.caption.fontSize,
    marginTop: 2,
    fontFamily: 'Manrope',
  }
});

export default StatusChip; 