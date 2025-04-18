export const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  export const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  };
  
  export const exportData = async () => {
    try {
      const [timers, history] = await Promise.all([
        loadTimers(),
        loadHistory(),
      ]);
      return { timers, history };
    } catch (e) {
      console.error('Failed to export data', e);
      return null;
    }
  };