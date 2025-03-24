import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card, ActivityIndicator } from 'react-native-paper';
import AIService from '../services/ai/AIService';
import apiConfig from '../config/api';

interface ActivityData {
  completionTime: number;
  accuracy: number;
  attentionSpan: number;
  errorPatterns: string[];
}

const DiagnosticActivity = () => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const aiService = new AIService(apiConfig.openai.apiKey);

  const mockActivityData: ActivityData = {
    completionTime: 45, // seconds
    accuracy: 0.65, // 65% accuracy
    attentionSpan: 120, // seconds
    errorPatterns: ['letter_reversal', 'number_sequencing', 'word_spacing'],
  };

  const mockInteractionData = {
    mouseMovements: [
      { x: 100, y: 200, timestamp: Date.now() },
      { x: 150, y: 220, timestamp: Date.now() + 1000 },
    ],
    responseDelays: [2.5, 3.1, 1.8, 4.2], // seconds
    correctionAttempts: 3,
  };

  const runDiagnostic = async () => {
    setLoading(true);
    try {
      const result = await aiService.analyzeLearningPattern(
        mockActivityData,
        mockInteractionData
      );
      setAnalysis(result);
    } catch (error) {
      console.error('Diagnostic error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderAnalysis = () => {
    if (!analysis) return null;

    return (
      <Card style={styles.analysisCard}>
        <Card.Content>
          <Text variant="titleLarge">Analysis Results</Text>
          <View style={styles.resultItem}>
            <Text variant="bodyLarge">
              Potential SLD: {analysis.potentialSLD ? 'Yes' : 'No'}
            </Text>
            <Text variant="bodyLarge">
              Confidence: {(analysis.confidence * 100).toFixed(1)}%
            </Text>
          </View>

          {Object.entries(analysis.areas).map(([area, data]: [string, any]) => (
            <View key={area} style={styles.areaItem}>
              <Text variant="titleMedium" style={styles.areaTitle}>
                {area.charAt(0).toUpperCase() + area.slice(1)}
              </Text>
              <Text variant="bodyMedium">
                Score: {(data.score * 100).toFixed(1)}%
              </Text>
              {data.concerns.map((concern: string, index: number) => (
                <Text key={index} variant="bodyMedium" style={styles.concern}>
                  • {concern}
                </Text>
              ))}
            </View>
          ))}

          <View style={styles.recommendations}>
            <Text variant="titleMedium">Recommendations:</Text>
            {analysis.recommendations.map((rec: string, index: number) => (
              <Text key={index} variant="bodyMedium" style={styles.recommendation}>
                {index + 1}. {rec}
              </Text>
            ))}
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <Card style={styles.activityCard}>
        <Card.Content>
          <Text variant="headlineMedium">Learning Pattern Analysis</Text>
          <Text variant="bodyLarge" style={styles.description}>
            This diagnostic tool analyzes learning patterns to identify potential
            specific learning disabilities (SLD) and provide personalized
            recommendations.
          </Text>
          <Button
            mode="contained"
            onPress={runDiagnostic}
            style={styles.button}
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Start Analysis'}
          </Button>
        </Card.Content>
      </Card>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
          <Text variant="bodyLarge" style={styles.loadingText}>
            Analyzing learning patterns...
          </Text>
        </View>
      )}

      {renderAnalysis()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  activityCard: {
    marginBottom: 16,
  },
  description: {
    marginVertical: 16,
    color: '#666',
  },
  button: {
    marginTop: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
  },
  analysisCard: {
    marginTop: 16,
  },
  resultItem: {
    marginVertical: 12,
  },
  areaItem: {
    marginVertical: 8,
  },
  areaTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  concern: {
    marginLeft: 16,
    color: '#666',
  },
  recommendations: {
    marginTop: 16,
  },
  recommendation: {
    marginTop: 4,
    marginLeft: 16,
  },
});

export default DiagnosticActivity; 