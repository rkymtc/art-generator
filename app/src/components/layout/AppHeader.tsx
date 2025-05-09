import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';
import { LOGO_STATUS } from '../../utils/constants';
import StatusChip from '../ui/StatusChip';
import { colors, typography } from '../../theme';

interface AppHeaderProps {
  status: typeof LOGO_STATUS[keyof typeof LOGO_STATUS];
  onChipPress?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  status,
  onChipPress 
}) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.appLogo}>AI Logo</Text>
      </View>
      
      {status !== LOGO_STATUS.IDLE && (
        <StatusChip status={status} onPress={onChipPress} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 6,
    alignItems: 'center',
    height: 44,
    marginTop: 0,
    marginBottom: 20,
  },
  appLogo: {
    fontSize: typography.heading2.fontSize,
    lineHeight: typography.heading2.lineHeight,
    letterSpacing: -0.17,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.textPrimary,
    
    fontFamily: typography.heading2.fontFamily,
  }
});

export default AppHeader; 