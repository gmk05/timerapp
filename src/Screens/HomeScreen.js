import React, { useContext, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';
import CategorySection from '../components/CategorySection';
import TimerModal from '../components/TimerModal';
import colors from '../constants/colors';

const HomeScreen = () => {
  const { state, dispatch } = useAppContext();
  const navigation = useNavigation();
  const [completedTimer, setCompletedTimer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Group timers by category
  const groupedTimers = state.timers.reduce((acc, timer) => {
    if (!acc[timer.category]) acc[timer.category] = [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const handleComplete = (timerId) => {
    const timer = state.timers.find(t => t.id === timerId);
    if (timer) {
      const historyItem = {
        id: Date.now().toString(),
        timerId: timer.id,
        name: timer.name,
        category: timer.category,
        completedAt: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_HISTORY', payload: historyItem });
      setCompletedTimer(timer);
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTimer')}
      >
        <Text style={styles.addButtonText}>+ Add Timer</Text>
      </TouchableOpacity>

      <FlatList
        data={Object.keys(groupedTimers)}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategorySection
            category={item}
            timers={groupedTimers[item]}
            onComplete={handleComplete}
          />
        )}
      />

      <TimerModal
        visible={modalVisible}
        timer={completedTimer}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  addButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;