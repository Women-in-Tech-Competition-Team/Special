import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import DiagnosticActivity from '../components/DiagnosticActivity';
import ReadingActivity from '../components/activities/ReadingActivity';

const LearningScreen = () => {
  const [activeActivity, setActiveActivity] = useState<'diagnostic' | 'reading' | null>(null);

  const renderActivitySelector = () => (
    <View style={styles.selectorContainer}>
      <Button
        mode="contained"
        onPress={() => setActiveActivity('diagnostic')}
        style={styles.activityButton}
      >
        Start Diagnostic Assessment
      </Button>
      <Button
        mode="contained"
        onPress={() => setActiveActivity('reading')}
        style={styles.activityButton}
      >
        Start Reading Activity
      </Button>
    </View>
  );

  const renderActivity = () => {
    switch (activeActivity) {
      case 'diagnostic':
        return <DiagnosticActivity />;
      case 'reading':
        return <ReadingActivity />;
      default:
        return renderActivitySelector();
    }
  };

  return (
    <ScrollView style={styles.container}>
      {activeActivity && (
        <Button
          mode="outlined"
          onPress={() => setActiveActivity(null)}
          style={styles.backButton}
        >
          Back to Activities
        </Button>
      )}
      {renderActivity()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  selectorContainer: {
    padding: 16,
    gap: 16,
  },
  activityButton: {
    marginBottom: 8,
  },
  backButton: {
    margin: 16,
  },
});

export default LearningScreen; 