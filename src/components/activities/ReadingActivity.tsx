import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, TextInput } from 'react-native-paper';
import DataCollectionService from '../../services/data/DataCollectionService';

interface Question {
  id: string;
  text: string;
  answer: string;
}

const questions: Question[] = [
  {
    id: 'q1',
    text: 'The cat sat on the ___.',
    answer: 'mat',
  },
  {
    id: 'q2',
    text: 'The sun is very ___.',
    answer: 'bright',
  },
  {
    id: 'q3',
    text: 'Birds can ___ in the sky.',
    answer: 'fly',
  },
];

const ReadingActivity = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    DataCollectionService.startActivity();
    setStartTime(Date.now());

    return () => {
      if (!isComplete) {
        DataCollectionService.endActivity();
      }
    };
  }, []);

  useEffect(() => {
    const handleInteraction = (event: MouseEvent | TouchEvent | KeyboardEvent) => {
      if (event instanceof MouseEvent) {
        DataCollectionService.recordInteraction({
          type: 'mouse',
          position: { x: event.clientX, y: event.clientY },
          timestamp: Date.now(),
        });
      } else if (event instanceof TouchEvent) {
        const touch = event.touches[0];
        DataCollectionService.recordInteraction({
          type: 'touch',
          position: { x: touch.clientX, y: touch.clientY },
          timestamp: Date.now(),
        });
      } else if (event instanceof KeyboardEvent) {
        DataCollectionService.recordInteraction({
          type: 'keyboard',
          key: event.key,
          timestamp: Date.now(),
        });
      }
    };

    document.addEventListener('mousemove', handleInteraction);
    document.addEventListener('touchmove', handleInteraction);
    document.addEventListener('keypress', handleInteraction);

    return () => {
      document.removeEventListener('mousemove', handleInteraction);
      document.removeEventListener('touchmove', handleInteraction);
      document.removeEventListener('keypress', handleInteraction);
    };
  }, []);

  const handleAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer.toLowerCase().trim() === currentQuestion.answer.toLowerCase();
    const timeToAnswer = Date.now() - startTime;

    DataCollectionService.recordAnswer(
      currentQuestion.id,
      answer,
      timeToAnswer,
      attempts + 1,
      isCorrect
    );

    if (isCorrect) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setAnswer('');
        setAttempts(0);
        setStartTime(Date.now());
      } else {
        completeActivity();
      }
    } else {
      setAttempts(attempts + 1);
    }
  };

  const completeActivity = () => {
    const activityData = DataCollectionService.endActivity();
    const metrics = DataCollectionService.calculateMetrics(activityData);
    setResults(metrics);
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium">Activity Complete!</Text>
          <View style={styles.results}>
            <Text variant="bodyLarge">Accuracy: {(results.accuracy * 100).toFixed(1)}%</Text>
            <Text variant="bodyLarge">
              Average Time per Question: {(results.averageTimePerQuestion / 1000).toFixed(1)}s
            </Text>
            <Text variant="bodyLarge">Total Attempts: {results.totalAttempts}</Text>
            <Text variant="bodyLarge">
              Attention Score: {(10 - results.attentionMetrics.pauseFrequency).toFixed(1)}/10
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge">Reading Activity</Text>
          <Text variant="bodyLarge" style={styles.question}>
            {currentQuestion.text}
          </Text>
          <TextInput
            mode="outlined"
            value={answer}
            onChangeText={setAnswer}
            placeholder="Type your answer"
            style={styles.input}
          />
          <Button mode="contained" onPress={handleAnswer} style={styles.button}>
            Submit Answer
          </Button>
          {attempts > 0 && (
            <Text variant="bodyMedium" style={styles.attempts}>
              Attempts: {attempts}
            </Text>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 16,
  },
  question: {
    marginVertical: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 8,
  },
  attempts: {
    color: '#666',
  },
  results: {
    marginTop: 16,
    gap: 8,
  },
});

export default ReadingActivity; 