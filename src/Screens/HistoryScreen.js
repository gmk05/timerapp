import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';
import colors from '../constants/colors';

const HistoryScreen = () => {
  const { state } = useAppContext();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Timers</Text>
      
      <FlatList
        data={state.history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.historyName}>{item.name}</Text>
            <View style={styles.historyDetails}>
              <Text style={styles.historyCategory}>{item.category}</Text>
              <Text style={styles.historyDate}>{formatDate(item.completedAt)}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No completed timers yet</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.text,
  },
  historyItem: {
    backgroundColor: colors.cardBackground,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  historyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.text,
  },
  historyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyCategory: {
    color: colors.primary,
  },
  historyDate: {
    color: colors.text,
    opacity: 0.7,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: colors.text,
    opacity: 0.5,
  },
});

export default HistoryScreen;