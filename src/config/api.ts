interface ApiConfig {
  openai: {
    apiKey: string;
  };
  azure?: {
    apiKey: string;
    endpoint: string;
  };
  google?: {
    apiKey: string;
    projectId: string;
  };
}

const apiConfig: ApiConfig = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  // Add other API configurations as needed
};

export default apiConfig; 