import axios, { AxiosInstance } from 'axios';
import { Logo, LogoGenerationResponse, LogoStatusResponse, LogosResponse } from '../types/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const logoService = {
  generateLogo: async (prompt: string, style: string): Promise<LogoGenerationResponse> => {
    try {
      const { data } = await apiClient.post('/logo/generate', { prompt, style });
      return data;
    } catch (error) {
      console.error('Logo generation error:', error);
      throw new Error('Failed to generate logo');
    }
  },

  checkLogoStatus: async (taskId: string): Promise<LogoStatusResponse> => {
    try {
      const { data } = await apiClient.get(`/logo/status/${taskId}`);
      return data;
    } catch (error) {
      console.error('Status check error:', error);
      throw new Error('Failed to check logo status');
    }
  },

  getLogos: async (limit: number = 10): Promise<LogosResponse> => {
    try {
      const { data } = await apiClient.get(`/logos`, { params: { limit } });
      return data;
    } catch (error) {
      console.error('Fetch logos error:', error);
      throw new Error('Failed to fetch logos');
    }
  },

  watchLogoStatus: (
    taskId: string,
    onProgress: (logo: Logo) => void,
    onComplete: (logo: Logo) => void,
    onError: (error: string) => void
  ): (() => void) => {
    let intervalId: NodeJS.Timeout;

    const checkStatus = async () => {
      try {
        const response = await logoService.checkLogoStatus(taskId);
        if (response.success && response.task) {
          onProgress(response.task);
          if (response.task.status === 'done' || response.task.status === 'error') {
            clearInterval(intervalId);
            onComplete(response.task);
          }
        } else {
          throw new Error(response.error || 'Unknown error');
        }
      } catch (error) {
        clearInterval(intervalId);
        onError(error instanceof Error ? error.message : 'Failed to check logo status');
      }
    };

    intervalId = setInterval(checkStatus, 2000);
    checkStatus(); 

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }
}; 