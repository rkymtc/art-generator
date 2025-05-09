export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}

export interface LogoApiResponse {
  success: boolean;
  taskId?: string;
  message?: string;
  error?: string;
  task?: {
    id: string;
    prompt: string;
    style?: string;
    status: 'processing' | 'done' | 'error';
    error?: string;
    imageUrl?: string;
    createdAt: string;
    completedAt?: string;
    updatedAt?: string;
  };
}

export interface ErrorResponse {
  error: string;
  code?: number;
}

export interface Logo {
  id: string;
  prompt: string;
  style: string;
  status: 'processing' | 'done' | 'error';
  imageUrl?: string;
  error?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface LogoGenerationResponse {
  success: boolean;
  taskId: string;
  message?: string;
  error?: string;
}

export interface LogoStatusResponse {
  success: boolean;
  task: Logo;
  error?: string;
}

export interface LogosResponse {
  success: boolean;
  logos: Logo[];
  error?: string;
} 