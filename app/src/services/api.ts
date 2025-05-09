import { Logo, LogoGenerationResponse, LogoStatusResponse, LogosResponse } from '../types/api';
const API_BASE_URL = 'http://localhost:5001/api';

export const logoService = {
  generateLogo: async (prompt: string, style: string): Promise<LogoGenerationResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/logo/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, style }),
      });
      console.log('Logo generation response:', response);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Logo generation error:', error);
      console.log('Logooooooooooo:');
      throw new Error('Failed to generate logo');
    }
  },

  checkLogoStatus: async (taskId: string): Promise<LogoStatusResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/logo/status/${taskId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Status check error:', error);
      throw new Error('Failed to check logo status');
    }
  },

  getLogos: async (limit: number = 10): Promise<LogosResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/logos?limit=${limit}`);
      const data = await response.json();
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