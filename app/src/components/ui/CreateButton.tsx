import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing } from '../../theme';
import { CreateButtonProps } from '../../types/ui';
// @ts-ignore
import StarsIcon from '../../assets/icons/stars.svg';

const GRADIENT_COLORS = ['#943DFF', '#2938DC'];
const GRADIENT_LOCATIONS = [0.2459, 1];

const CreateButton: React.FC<CreateButtonProps> = ({ onPress, isLoading }) => {
  return (
    <View style={styles.bottomContainer}>
      <LinearGradient
        colors={GRADIENT_COLORS}
        locations={GRADIENT_LOCATIONS}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.createButton}
      >
        <TouchableOpacity 
          style={styles.createButtonInner}
          onPress={onPress}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          <Text style={styles.createButtonText}>Create</Text>
          <StarsIcon width={20} height={20} style={styles.createButtonIcon} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    width: '100%',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 0 : 0,
    left: 22,
    right: 22,
  },
  createButton: {
    borderRadius: 50,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    marginBottom: spacing.md,
    height: 56,
    width: '100%',
  },
  createButtonInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
    width: '100%',
  },
  createButtonText: {
    color: colors.white,
    fontSize: typography.button.fontSize,
    fontFamily: typography.button.fontFamily,
  },
  createButtonIcon: {
    marginLeft: spacing.xs,
  }
});

export default CreateButton; 