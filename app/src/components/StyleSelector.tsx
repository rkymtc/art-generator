import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (style: string) => void;
}

const LOGO_STYLES = [
  { id: 'monogram', label: 'Monogram' },
  { id: 'abstract', label: 'Abstract' },
  { id: 'mascot', label: 'Mascot' },
  { id: 'default', label: 'Default' },
];

export const StyleSelector = ({ selectedStyle, onStyleSelect }: StyleSelectorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Style</Text>
      <View style={styles.grid}>
        {LOGO_STYLES.map((style) => (
          <TouchableOpacity
            key={style.id}
            style={[
              styles.styleButton,
              selectedStyle === style.id && styles.selectedButton,
            ]}
            onPress={() => onStyleSelect(style.id)}
          >
            <Text
              style={[
                styles.styleText,
                selectedStyle === style.id && styles.selectedText,
              ]}
            >
              {style.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  styleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  selectedButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  styleText: {
    color: '#333',
    fontSize: 14,
  },
  selectedText: {
    color: '#fff',
  },
}); 