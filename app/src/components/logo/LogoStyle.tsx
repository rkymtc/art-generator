import React, { memo, useCallback, useMemo } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { formatStyleName } from '../../utils/logoStyles';
import { LogoStyleProps } from '../../types/logo';
import { colors, typography, spacing } from '../../theme';

const logoImages = {
  'no-style': require('../../assets/logo-styles/no-style.png'),
  'monogram': require('../../assets/logo-styles/monogram.png'),
  'abstract': require('../../assets/logo-styles/abstract.png'),
  'mascot': require('../../assets/logo-styles/mascot.png'),
};



const LogoStyle = memo(function LogoStyle({ style: styleKey, selected, onSelect }: LogoStyleProps) {
  const handleSelect = useCallback(() => {
    onSelect(styleKey);
  }, [onSelect, styleKey]);
  
  const primaryColors = useMemo(() => {
    return Platform.select({
      ios: [colors.backgroundLight, colors.backgroundLight],
      android: [colors.backgroundLight, colors.backgroundLight], 
    }) || [colors.backgroundLight, colors.backgroundLight];
  }, []);

  const overlayColors = useMemo(() => {
    return Platform.select({
      ios: [colors.primary, colors.primary],
      android: [colors.primary, colors.primary], 
    }) || [colors.primary, colors.primary];
  }, []);
  
  const iconComponent = useMemo(() => {
    const imageSource = logoImages[styleKey as keyof typeof logoImages];
    if (!imageSource) return null;
    
    return (
      <Image 
        source={imageSource} 
        style={styles.icon}
        fadeDuration={0}
      />
    );
  }, [styleKey]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSelect}>
        <LinearGradient
          colors={primaryColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.button, selected && styles.selectedButton]}
        >
          {selected && (
            <LinearGradient
              colors={overlayColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradientOverlay}
            />
          )}
          {iconComponent}
        </LinearGradient>
      </TouchableOpacity>
      <Text 
        style={[styles.label, selected && styles.selectedLabel]}
        numberOfLines={1}
      >
        {formatStyleName(styleKey)}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 90,
    alignItems: 'center',
    marginHorizontal: spacing.sm,
  },
  
  button: {
    width: 90,
    height: 90,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.darkGrey,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  selectedButton: {
    borderWidth: 2,
    borderColor: colors.textPrimary,
  },
  
  label: {
    marginTop: spacing.sm,
    fontFamily: typography.caption.fontFamily,
    fontSize: typography.caption.fontSize,
    lineHeight: typography.caption.lineHeight,
    letterSpacing: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.textSecondary,
  },
  selectedLabel: {
    fontFamily: typography.bodyBold.fontFamily,
    letterSpacing: -0.13,
    color: colors.textPrimary,
  },
  
  icon: {
  
    resizeMode: 'contain',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: Platform.OS === 'ios' ? 0.25 : 0.3, 
  }
});

export default LogoStyle; 