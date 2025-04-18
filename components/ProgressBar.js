import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '../constants/colors';

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${progress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: '100%',
    backgroundColor: colors.border,
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
});

export default ProgressBar;