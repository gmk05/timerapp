import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMERS_KEY = '@timers';
const HISTORY_KEY = '@history';

export const loadTimers = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TIMERS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to load timers', e);
    return [];
  }
};

export const saveTimers = async (timers) => {
  try {
    const jsonValue = JSON.stringify(timers);
    await AsyncStorage.setItem(TIMERS_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save timers', e);
  }
};

export const loadHistory = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(HISTORY_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to load history', e);
    return [];
  }
};

export const saveHistory = async (history) => {
  try {
    const jsonValue = JSON.stringify(history);
    await AsyncStorage.setItem(HISTORY_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save history', e);
  }
};

export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove([TIMERS_KEY, HISTORY_KEY]);
  } catch (e) {
    console.error('Failed to clear data', e);
  }
};