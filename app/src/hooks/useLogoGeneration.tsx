import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { LogoTask } from '../types/logo';
import { logoService } from '../services/api';

const FALLBACK_IMAGES = [
  'https://placehold.co/600x400/EEE/31343C',
  'https://placehold.co/600x400/3D4DB7/FFFFFF',
  'https://placehold.co/600x400/7209B7/FFFFFF',
  'https://placehold.co/600x400/F72585/FFFFFF',
  'https://placehold.co/600x400/4CC9F0/FFFFFF',
];

interface LogoGenerationContextType {
  status: 'idle' | 'processing' | 'done' | 'error';
  task: LogoTask | null;
  error: string | null;
  logo: string | null;
  generateLogo: (prompt: string, style?: string) => Promise<void>;
  clearLogo: () => void;
}

interface LogoGenerationProviderProps {
  children: ReactNode;
}

const LogoGenerationContext = createContext<LogoGenerationContextType | undefined>(undefined);

const LogoGenerationProvider = ({ children }: LogoGenerationProviderProps): React.ReactElement => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');
  const [task, setTask] = useState<LogoTask | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
    const [cancelWatcher, setCancelWatcher] = useState<(() => void) | null>(null);

  const startLogoGeneration = async (prompt: string, style?: string): Promise<void> => {
    try {
      if (cancelWatcher) {
        cancelWatcher();
        setCancelWatcher(null);
      }
      
      setStatus('processing');
      setError(null);
      setLogo(null);
      
      const styleToUse = style || 'default';
            const response = await logoService.generateLogo(prompt, styleToUse);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to start logo generation');
      }
            const newTask: LogoTask = {
        id: response.taskId,
        prompt,
        style: styleToUse,
        status: 'processing',
        createdAt: new Date()
      };
      
      setTask(newTask);
            const watchCancel = logoService.watchLogoStatus(
        response.taskId,
        (updatedTask) => {
          setTask(prevTask => {
            if (!prevTask) return null;
                        const convertedTask: LogoTask = {
              ...prevTask,
              id: updatedTask.id,
              prompt: updatedTask.prompt,
              style: updatedTask.style,
              status: updatedTask.status as 'processing' | 'done' | 'error',
              error: updatedTask.error,
              imageUrl: updatedTask.imageUrl,
              createdAt: updatedTask.createdAt ? new Date(updatedTask.createdAt) : prevTask.createdAt,
              completedAt: updatedTask.completedAt ? new Date(updatedTask.completedAt) : prevTask.completedAt,
              updatedAt: updatedTask.updatedAt ? new Date(updatedTask.updatedAt) : prevTask.updatedAt
            };
            
            return convertedTask;
          });
        },
        (completedTask) => {
          if (completedTask.status === 'done' && completedTask.imageUrl) {
            setTask(prevTask => {
              if (!prevTask) return null;
              
              return {
                ...prevTask,
                status: 'done',
                imageUrl: completedTask.imageUrl,
                completedAt: completedTask.completedAt ? new Date(completedTask.completedAt) : new Date(),
                updatedAt: completedTask.updatedAt ? new Date(completedTask.updatedAt) : new Date()
              };
            });
            
            setStatus('done');
            setLogo(completedTask.imageUrl);
            console.log('Logo successfully generated:', completedTask.imageUrl);
          } else if (completedTask.status === 'error') {
            setStatus('error');
            setError(completedTask.error || 'Unknown error occurred');
          }
        },
        (errorMessage) => {
          setStatus('error');
          setError(errorMessage);
        }
      );
      
      setCancelWatcher(() => watchCancel);
      
    } catch (err) {
      console.error('Logo generation error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Logo oluşturulamadı';
      setError(errorMessage);
      setStatus('error');
    }
  };

  const clearLogoGeneration = (): void => {
    if (cancelWatcher) {
      cancelWatcher();
      setCancelWatcher(null);
    }
    setStatus('idle');
    setTask(null);
    setError(null);
    setLogo(null);
  };

  useEffect(() => {
    return () => {
      if (cancelWatcher) {
        cancelWatcher();
      }
    };
  }, [cancelWatcher]);

  const contextValue: LogoGenerationContextType = {
    status,
    task,
    error,
    logo,
    generateLogo: startLogoGeneration,
    clearLogo: clearLogoGeneration
  };

  return (
    <LogoGenerationContext.Provider value={contextValue}>
      {children}
    </LogoGenerationContext.Provider>
  );
};

const useLogoGeneration = (): LogoGenerationContextType => {
  const context = useContext(LogoGenerationContext);
  if (!context) {
    throw new Error('useLogoGeneration must be used within a LogoGenerationProvider');
  }
  return context;
};

export { LogoGenerationProvider, useLogoGeneration };
export default useLogoGeneration; 