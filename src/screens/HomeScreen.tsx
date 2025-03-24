import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Card style={styles.welcomeCard}>
        <Card.Content>
          <Text variant="headlineMedium">Welcome back!</Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Let's continue our learning journey
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.progressCard}>
        <Card.Content>
          <Text variant="titleLarge">Today's Progress</Text>
          <View style={styles.progressStats}>
            <Text variant="bodyLarge">🎯 2 Activities Completed</Text>
            <Text variant="bodyLarge">⭐ 50 Points Earned</Text>
            <Text variant="bodyLarge">⏱️ 30 Minutes Learned</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.activityCard}>
        <Card.Content>
          <Text variant="titleLarge">Recommended Activities</Text>
          <View style={styles.activityList}>
            <Button 
              mode="contained" 
              onPress={() => {}} 
              style={styles.activityButton}
            >
              Math Games
            </Button>
            <Button 
              mode="contained" 
              onPress={() => {}} 
              style={styles.activityButton}
            >
              Reading Adventure
            </Button>
            <Button 
              mode="contained" 
              onPress={() => {}} 
              style={styles.activityButton}
            >
              Memory Challenge
            </Button>
          </View>
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
  welcomeCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  subtitle: {
    marginTop: 8,
    color: '#666',
  },
  progressCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  progressStats: {
    marginTop: 16,
    gap: 8,
  },
  activityCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  activityList: {
    marginTop: 16,
    gap: 8,
  },
  activityButton: {
    marginVertical: 4,
  },
});

export default HomeScreen; 