import { api } from './api';
import type { QuizData, QuizQuestionType } from '@/page/Quiz/types';

export interface CreateQuizDto {
  // Add the fields based on your backend DTO
  // This is a placeholder - adjust according to your actual CreateQuizDto
  questions?: QuizQuestionType[];
  [key: string]: any;
}

export interface QuizResponse {
  success?: boolean;
  message?: string;
  data?: QuizData;
  [key: string]: any;
}

/**
 * Get username from localStorage or use default
 */
const getUsername = (): string => {
  return localStorage.getItem('username') || 'User';
};

export const quizService = {
  /**
   * Fetch quiz questions for a specific tree
   * @param treeId - The ID of the tree
   * @param username - Optional username (defaults to localStorage value)
   * @returns Promise with quiz data
   */
  getQuizzes: async (treeId: number, username?: string): Promise<QuizData | null> => {
    try {
      const user = username || getUsername();
      console.log(`[QuizService] Fetching quizzes for tree ${treeId} as user "${user}"...`);
      
      // POST request with username in body as required by backend
      const response = await api.post<QuizData>(`/quizzes/${treeId}`, {
        username: user
      });
      
      console.log('[QuizService] Quizzes fetched successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('[QuizService] Error fetching quizzes:', error);
      
      if (error.response) {
        console.error('[QuizService] Error details:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        });
      }
      
      return null;
    }
  },

  /**
   * Create a new quiz for a specific tree
   * @param treeId - The ID of the tree
   * @param data - The quiz data to create
   * @returns Promise with the creation response
   */
  createQuiz: async (treeId: number, data: CreateQuizDto): Promise<QuizResponse | null> => {
    try {
      console.log(`[QuizService] Creating quiz for tree ${treeId}...`);
      console.log('[QuizService] Quiz data:', data);
      
      const response = await api.post<QuizResponse>(`/quizzes/${treeId}`, data);
      
      console.log('[QuizService] Quiz created successfully:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('[QuizService] Error creating quiz:', error);
      
      if (error.response) {
        console.error('[QuizService] Error details:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        });
      }
      
      return null;
    }
  },
};

export default quizService;

