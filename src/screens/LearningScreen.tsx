import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, ProgressBar } from 'react-native-paper';

interface Activity {
  id: string;
  title: string;
  description: string;
  progress: number;
  type: 'math' | 'reading' | 'memory';
}

const activities: Activity[] = [
  {
    id: '1',
    title: 'Number Recognition',
    description: 'Learn to identify numbers through fun games',
    progress: 0.6,
    type: 'math',
  },
  {
    id: '2',
    title: 'Letter Sounds',
    description: 'Practice phonics and letter recognition',
    progress: 0.3,
    type: 'reading',
  },
  {
    id: '3',
    title: 'Pattern Memory',
    description: 'Enhance memory skills with pattern matching',
    progress: 0.8,
    type: 'memory',
  },
];

const LearningScreen = () => {
  const renderActivityCard = (activity: Activity) => (
    <Card key={activity.id} style={styles.activityCard}>
      <Card.Content>
        <Text variant="titleLarge">{activity.title}</Text>
        <Text variant="bodyMedium" style={styles.description}>
          {activity.description}
        </Text>
        <View style={styles.progressContainer}>
          <Text variant="bodySmall" style={styles.progressText}>
            Progress: {Math.round(activity.progress * 100)}%
          </Text>
          <ProgressBar progress={activity.progress} style={styles.progressBar} />
        </View>
        <Button 
          mode="contained" 
          onPress={() => {}}
          style={styles.startButton}
        >
          Continue Learning
        </Button>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <Text variant="headlineMedium" style={styles.header}>
        Learning Activities
      </Text>
      {activities.map(renderActivityCard)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  activityCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  description: {
    marginTop: 8,
    color: '#666',
  },
  progressContainer: {
    marginTop: 16,
  },
  progressText: {
    marginBottom: 4,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  startButton: {
    marginTop: 16,
  },
});

export default LearningScreen; 