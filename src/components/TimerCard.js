import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';
import colors from '../constants/colors';

const TimerCard = ({ timer, onStart, onPause, onReset, onComplete }) => {
  const [remaining, setRemaining] = useState(timer.duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive && remaining > 0) {
      interval = setInterval(() => {
        setRemaining(prev => prev - 1);
      }, 1000);
    } else if (remaining === 0 && isActive) {
      setIsActive(false);
      onComplete(timer.id);
    }
    return () => clearInterval(interval);
  }, [isActive, remaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{timer.name}</Text>
      <Text style={styles.time}>{formatTime(remaining)}</Text>
      <ProgressBar progress={remaining / timer.duration} />
      <View style={styles.controls}>
        {!isActive ? (
          <TouchableOpacity style={styles.button} onPress={() => setIsActive(true)}>
            <Text>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => setIsActive(false)}>
            <Text>Pause</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={() => {
          setIsActive(false);
          setRemaining(timer.duration);
        }}>
          <Text>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.text,
  },
  time: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 8,
    color: colors.text,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  button: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
});

export default TimerCard;