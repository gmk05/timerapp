import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TimerCard from './TimerCard';
import colors from '../constants/colors';

const CategorySection = ({ 
  category, 
  timers, 
  onTimerAction,
  onComplete,
  onBulkAction 
}) => {
  const [expanded, setExpanded] = useState(true);

  const handleBulkAction = (action) => {
    onBulkAction(category, action);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.categoryText}>{category} ({timers.length})</Text>
        <Text style={styles.expandIcon}>{expanded ? '−' : '+'}</Text>
      </TouchableOpacity>

      {expanded && (
        <>
          <View style={styles.bulkActions}>
            <TouchableOpacity 
              style={styles.bulkButton}
              onPress={() => handleBulkAction('start')}
            >
              <Text style={styles.bulkButtonText}>Start All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.bulkButton}
              onPress={() => handleBulkAction('pause')}
            >
              <Text style={styles.bulkButtonText}>Pause All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.bulkButton}
              onPress={() => handleBulkAction('reset')}
            >
              <Text style={styles.bulkButtonText}>Reset All</Text>
            </TouchableOpacity>
          </View>

          {timers.map((timer) => (
            <TimerCard
              key={timer.id}
              timer={timer}
              onStart={() => onTimerAction(timer.id, { status: 'running' })}
              onPause={() => onTimerAction(timer.id, { status: 'paused' })}
              onReset={() => {
                onTimerAction(timer.id, { 
                  status: 'paused',
                  remaining: timer.duration 
                });
              }}
              onComplete={onComplete}
            />
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.primary,
  },
  categoryText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  expandIcon: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  bulkButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  bulkButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CategorySection;