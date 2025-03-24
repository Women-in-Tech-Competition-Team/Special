import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, ProgressBar, List } from 'react-native-paper';

interface SkillProgress {
  skill: string;
  progress: number;
  lastActivity: string;
}

const skillProgress: SkillProgress[] = [
  {
    skill: 'Mathematics',
    progress: 0.75,
    lastActivity: 'Number Recognition',
  },
  {
    skill: 'Reading',
    progress: 0.60,
    lastActivity: 'Letter Sounds',
  },
  {
    skill: 'Memory',
    progress: 0.85,
    lastActivity: 'Pattern Matching',
  },
];

const achievements = [
  {
    title: 'Quick Learner',
    description: 'Completed 5 activities in one day',
    date: '2024-03-15',
  },
  {
    title: 'Math Master',
    description: 'Achieved 100% in number recognition',
    date: '2024-03-14',
  },
  {
    title: 'Reading Star',
    description: 'Read 10 stories successfully',
    date: '2024-03-13',
  },
];

const ProgressScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.overallCard}>
        <Card.Content>
          <Text variant="headlineMedium">Overall Progress</Text>
          <View style={styles.overallStats}>
            <Text variant="bodyLarge">Total Learning Time: 12h 30m</Text>
            <Text variant="bodyLarge">Activities Completed: 25</Text>
            <Text variant="bodyLarge">Achievement Points: 1250</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.skillsCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Skills Progress
          </Text>
          {skillProgress.map((item, index) => (
            <View key={index} style={styles.skillItem}>
              <Text variant="bodyLarge">{item.skill}</Text>
              <Text variant="bodySmall" style={styles.lastActivity}>
                Last: {item.lastActivity}
              </Text>
              <ProgressBar
                progress={item.progress}
                style={styles.progressBar}
              />
            </View>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.achievementsCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Recent Achievements
          </Text>
          {achievements.map((achievement, index) => (
            <List.Item
              key={index}
              title={achievement.title}
              description={achievement.description}
              left={props => <List.Icon {...props} icon="trophy" />}
              right={() => (
                <Text variant="bodySmall" style={styles.date}>
                  {achievement.date}
                </Text>
              )}
            />
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  overallCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  overallStats: {
    marginTop: 16,
    gap: 8,
  },
  skillsCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    marginBottom: 16,
  },
  skillItem: {
    marginBottom: 16,
  },
  lastActivity: {
    color: '#666',
    marginTop: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  achievementsCard: {
    backgroundColor: '#fff',
  },
  date: {
    color: '#666',
  },
});

export default ProgressScreen; 