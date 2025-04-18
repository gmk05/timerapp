import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import { useAppContext } from '../context/AppContext';
import colors from '../constants/colors';
import { generateId } from '../utils/helpers';

const AddTimerScreen = ({ navigation }) => {
  const { state, dispatch } = useAppContext();
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('300'); // 5 minutes default
  const [category, setCategory] = useState(state.categories[0]);
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  const handleSave = () => {
    if (!name.trim() || !duration) return;
    
    const newTimer = {
      id: generateId(),
      name: name.trim(),
      duration: parseInt(duration),
      category,
      halfwayAlert,
      status: 'paused',
    };
    
    dispatch({ type: 'ADD_TIMER', payload: newTimer });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Timer Name</Text>
      <TextInput
        placeholder="e.g., Workout Timer"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Duration (seconds)</Text>
      <TextInput
        placeholder="e.g., 300 for 5 minutes"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={setCategory}
          style={styles.picker}
        >
          {state.categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Enable halfway alert</Text>
        <TouchableOpacity
          style={[styles.switch, halfwayAlert ? styles.switchOn : styles.switchOff]}
          onPress={() => setHalfwayAlert(!halfwayAlert)}
        >
          <Text style={styles.switchText}>{halfwayAlert ? 'ON' : 'OFF'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: colors.text,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: colors.cardBackground,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: colors.cardBackground,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  switchLabel: {
    fontSize: 16,
    color: colors.text,
  },
  switch: {
    width: 60,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchOn: {
    backgroundColor: colors.primary,
  },
  switchOff: {
    backgroundColor: colors.border,
  },
  switchText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddTimerScreen;