import { Platform } from 'react-native';

interface InteractionEvent {
  type: 'touch' | 'mouse' | 'keyboard';
  timestamp: number;
  position?: { x: number; y: number };
  key?: string;
}

interface ActivityMetrics {
  startTime: number;
  endTime: number;
  totalPauses: number;
  pauseDurations: number[];
  interactions: InteractionEvent[];
  answers: {
    questionId: string;
    answer: string;
    timeToAnswer: number;
    attempts: number;
    isCorrect: boolean;
  }[];
}

class DataCollectionService {
  private currentActivity: ActivityMetrics | null = null;
  private interactionBuffer: InteractionEvent[] = [];
  private pauseStartTime: number | null = null;

  startActivity(): void {
    this.currentActivity = {
      startTime: Date.now(),
      endTime: 0,
      totalPauses: 0,
      pauseDurations: [],
      interactions: [],
      answers: [],
    };
  }

  recordInteraction(event: Partial<InteractionEvent>): void {
    if (!this.currentActivity) return;

    const interaction: InteractionEvent = {
      type: event.type || 'touch',
      timestamp: Date.now(),
      ...event,
    };

    this.interactionBuffer.push(interaction);
    
    // Process buffer every 10 events to avoid performance issues
    if (this.interactionBuffer.length >= 10) {
      this.currentActivity.interactions.push(...this.interactionBuffer);
      this.interactionBuffer = [];
    }
  }

  recordAnswer(
    questionId: string,
    answer: string,
    timeToAnswer: number,
    attempts: number,
    isCorrect: boolean
  ): void {
    if (!this.currentActivity) return;

    this.currentActivity.answers.push({
      questionId,
      answer,
      timeToAnswer,
      attempts,
      isCorrect,
    });
  }

  recordPauseStart(): void {
    if (!this.currentActivity) return;
    this.pauseStartTime = Date.now();
  }

  recordPauseEnd(): void {
    if (!this.currentActivity || !this.pauseStartTime) return;
    
    const pauseDuration = Date.now() - this.pauseStartTime;
    this.currentActivity.pauseDurations.push(pauseDuration);
    this.currentActivity.totalPauses++;
    this.pauseStartTime = null;
  }

  endActivity(): ActivityMetrics {
    if (!this.currentActivity) {
      throw new Error('No active activity to end');
    }

    // Add any remaining interactions from buffer
    if (this.interactionBuffer.length > 0) {
      this.currentActivity.interactions.push(...this.interactionBuffer);
      this.interactionBuffer = [];
    }

    this.currentActivity.endTime = Date.now();
    const activityData = this.currentActivity;
    this.currentActivity = null;
    return activityData;
  }

  calculateMetrics(data: ActivityMetrics) {
    const totalDuration = data.endTime - data.startTime;
    const activeDuration = totalDuration - data.pauseDurations.reduce((a, b) => a + b, 0);
    
    const accuracy = data.answers.filter(a => a.isCorrect).length / data.answers.length;
    const averageTimePerQuestion = data.answers.reduce((sum, a) => sum + a.timeToAnswer, 0) / data.answers.length;
    const totalAttempts = data.answers.reduce((sum, a) => sum + a.attempts, 0);

    const interactionFrequency = data.interactions.length / (activeDuration / 1000); // interactions per second
    
    return {
      totalDuration,
      activeDuration,
      accuracy,
      averageTimePerQuestion,
      totalAttempts,
      interactionFrequency,
      attentionMetrics: {
        pauseFrequency: data.totalPauses / (totalDuration / 60000), // pauses per minute
        averagePauseDuration: data.pauseDurations.reduce((a, b) => a + b, 0) / data.totalPauses,
      },
    };
  }

  getDeviceInfo() {
    return {
      platform: Platform.OS,
      isWeb: Platform.OS === 'web',
      timestamp: new Date().toISOString(),
    };
  }
}

export default new DataCollectionService(); 