import { Configuration, OpenAIApi } from 'openai';

interface AIAnalysisResult {
  potentialSLD: boolean;
  confidence: number;
  areas: {
    reading?: {
      score: number;
      concerns: string[];
    };
    writing?: {
      score: number;
      concerns: string[];
    };
    math?: {
      score: number;
      concerns: string[];
    };
    attention?: {
      score: number;
      concerns: string[];
    };
  };
  recommendations: string[];
}

class AIService {
  private openai: OpenAIApi;
  
  constructor(apiKey: string) {
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async analyzeLearningPattern(
    activityResults: any,
    interactionData: any
  ): Promise<AIAnalysisResult> {
    try {
      const prompt = this.constructAnalysisPrompt(activityResults, interactionData);
      
      const response = await this.openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert educational psychologist specializing in detecting specific learning disabilities in early childhood education."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 1000
      });

      return this.parseAIResponse(response.data.choices[0].message?.content || "");
    } catch (error) {
      console.error('Error analyzing learning pattern:', error);
      throw new Error('Failed to analyze learning pattern');
    }
  }

  private constructAnalysisPrompt(activityResults: any, interactionData: any): string {
    return `
      Please analyze the following learning data for potential specific learning disabilities:
      
      Activity Results:
      ${JSON.stringify(activityResults, null, 2)}
      
      Interaction Data:
      ${JSON.stringify(interactionData, null, 2)}
      
      Please provide a detailed analysis including:
      1. Presence of potential SLD indicators
      2. Confidence level in the assessment
      3. Specific areas of concern (reading, writing, math, attention)
      4. Recommendations for support and intervention
      
      Format the response as a JSON object matching the AIAnalysisResult interface.
    `;
  }

  private parseAIResponse(response: string): AIAnalysisResult {
    try {
      return JSON.parse(response);
    } catch (error) {
      console.error('Error parsing AI response:', error);
      throw new Error('Failed to parse AI response');
    }
  }

  async generatePersonalizedActivity(
    studentProfile: any,
    previousAnalysis: AIAnalysisResult
  ): Promise<any> {
    try {
      const prompt = this.constructActivityPrompt(studentProfile, previousAnalysis);
      
      const response = await this.openai.createChatCompletion({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert in creating personalized learning activities for children with specific learning disabilities."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return JSON.parse(response.data.choices[0].message?.content || "{}");
    } catch (error) {
      console.error('Error generating personalized activity:', error);
      throw new Error('Failed to generate personalized activity');
    }
  }

  private constructActivityPrompt(studentProfile: any, previousAnalysis: AIAnalysisResult): string {
    return `
      Please generate a personalized learning activity based on:
      
      Student Profile:
      ${JSON.stringify(studentProfile, null, 2)}
      
      Previous Analysis:
      ${JSON.stringify(previousAnalysis, null, 2)}
      
      Generate an activity that:
      1. Addresses the identified areas of concern
      2. Builds on the student's strengths
      3. Incorporates appropriate accommodations
      4. Is engaging and age-appropriate
      
      Format the response as a JSON object containing the activity details.
    `;
  }
}

export default AIService; 