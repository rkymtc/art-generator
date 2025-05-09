import React, { memo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView
} from 'react-native';
import LogoStyle from './LogoStyle';
import { LOGO_STYLES } from '../../utils/logoStyles';
import { StyleSelectorProps } from '../../types/contexts';
import { colors, typography, spacing } from '../../theme';

const StyleSelector: React.FC<StyleSelectorProps> = memo(({ 
  selectedStyle, 
  onSelectStyle, 
  isProcessing,
  errors,
  touched
}) => {
  return (
    <View style={styles.styleContainer}>
      <Text style={styles.sectionLabel}>Logo Styles</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.stylesScrollContent}
      >
        {LOGO_STYLES.map((styleOption) => (
          <LogoStyle
            key={styleOption.id}
            style={styleOption.id}
            selected={selectedStyle === styleOption.id}
            onSelect={(styleId) => {
              if (!isProcessing) {
                onSelectStyle(styleId);
              }
            }}
          />
        ))}
      </ScrollView>
      {errors && touched && (
        <Text style={styles.errorText}>{errors}</Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  styleContainer: {
    marginBottom: 0,
    paddingBottom: spacing.md,
  },
  
  sectionLabel: {
    color: colors.textPrimary,
    fontSize: typography.heading3.fontSize,
    lineHeight: typography.heading3.lineHeight,
    letterSpacing: 0,
    textAlign: 'left',
    marginBottom: spacing.md,
    fontFamily: typography.heading3.fontFamily,
  },
  
  stylesScrollContent: {
    paddingVertical: spacing.sm,
  },
  
  errorText: {
    color: colors.error,
    fontSize: typography.caption.fontSize,
    marginTop: spacing.xs,
    fontFamily: typography.caption.fontFamily,
  }
});

export default StyleSelector; 