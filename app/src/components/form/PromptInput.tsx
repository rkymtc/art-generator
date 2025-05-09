import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing } from '../../theme';

interface PromptInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  focusedField?: string;
  isProcessing?: boolean;
  errors?: string;
  touched?: boolean;
  onSurpriseMePress?: () => void;
  placeholder?: string;
}

const PromptInput: React.FC<PromptInputProps> = ({ 
  value, 
  onChangeText, 
  onFocus, 
  onBlur, 
  focusedField, 
  isProcessing,
  errors,
  touched,
  onSurpriseMePress,
  placeholder = "A blue lion logo reading 'HEXA' in bold letters"
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputHeader}>
        <Text style={styles.label}>Enter Your Prompt</Text>
        <TouchableOpacity 
          style={styles.surpriseButton}
          onPress={onSurpriseMePress}
          disabled={isProcessing}
        >
          <Text style={styles.surpriseText}>🎲 Surprise me</Text>
        </TouchableOpacity>
      </View>
      <View>
        <LinearGradient
          colors={[colors.backgroundLight, colors.backgroundLight]}
          start={{ x: 0, y: 0 }}  
          end={{ x: 0, y: 1 }}
          style={[
            styles.inputGradientContainer,
            focusedField === 'prompt' && styles.inputGradientContainerFocused
          ]}
        >   
          <LinearGradient
            colors={['rgba(148, 61, 255, 0.05)', 'rgba(41, 56, 220, 0.05)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.inputSecondaryGradient}
          >
            <TextInput
              style={[
                styles.input, 
                focusedField === 'prompt' && styles.inputFocused
              ]}
              placeholder={placeholder}
              placeholderTextColor="#71717A"
              value={value}
              onChangeText={onChangeText}
              onFocus={onFocus}
              onBlur={onBlur}
              multiline
              numberOfLines={4}
              editable={!isProcessing}
              autoFocus={false}
              maxLength={500}
              cursorColor={focusedField === 'prompt' ? colors.white : undefined}
              selectionColor={focusedField === 'prompt' ? 'rgba(250, 250, 250, 0.3)' : undefined}
            />
          </LinearGradient>
          <Text style={styles.charCount}>{value.length}/500</Text>
        </LinearGradient>
      </View>
      {errors && touched && (
        <Text style={styles.errorText}>{errors}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 0,
    marginBottom: spacing.xxl,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  label: {
    color: colors.textPrimary,
    fontFamily: typography.heading3.fontFamily,
    marginTop: 0,
    fontSize: typography.heading3.fontSize,
    lineHeight: typography.heading3.lineHeight,
    letterSpacing: 0,
    textAlign: 'left',
  },
  surpriseButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  surpriseText: {
    color: colors.textPrimary,
    fontSize: typography.caption.fontSize,
    lineHeight: typography.caption.lineHeight,
    letterSpacing: 0,
    textAlign: 'center',
    fontFamily: typography.caption.fontFamily,
  },
  inputGradientContainer: {
    borderRadius: 16,
    height: 215,
    borderWidth: 1,
    borderColor: 'rgba(45, 45, 55, 0.8)',
    overflow: 'hidden',
  },
  inputGradientContainerFocused: {
    borderColor: colors.white,
    borderWidth: 1,
  },
  inputSecondaryGradient: {
    flex: 1,
    borderRadius: 16,
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    color: 'rgba(180, 180, 190, 0.9)',
    padding: spacing.md,
    height: 175,
    textAlignVertical: 'top',
    fontFamily: typography.body.fontFamily,
    fontSize: typography.body.fontSize,
    lineHeight: typography.body.lineHeight,
    letterSpacing: 0,
  },
  inputFocused: {
    borderWidth: 0,
  },
  charCount: {
    color: 'rgba(250, 250, 250, 0.6)',
    fontSize: typography.caption.fontSize,
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.md,
    fontFamily: typography.caption.fontFamily,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.caption.fontSize,
    marginTop: spacing.xs,
    fontFamily: typography.caption.fontFamily,
  },
});

export default PromptInput; 