import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export interface SendMessageRequest {
  username: string;
  content: {
    text: string;
  };
}

export interface SendMessageResponse {
  success?: boolean;
  message?: string;
  data?: any;
  tree?: any;
  [key: string]: any;
}

/**
 * Sends a chat message to the backend API
 * @param username - The username of the user
 * @param text - The user's message text
 * @returns Promise with the backend response
 */
export const sendChatMessage = async (
  username: string,
  text: string
): Promise<SendMessageResponse> => {
  const payload: SendMessageRequest = {
    username,
    content: {
      text,
    },
  };

  try {
    console.log('[ChatService] Sending message to backend...');
    console.log('[ChatService] Endpoint:', `${API_BASE_URL}/trees`);
    console.log('[ChatService] Request payload:');
    console.log(JSON.stringify(payload, null, 2));

    const response = await axios.post<SendMessageResponse>(
      `${API_BASE_URL}/trees`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 9999999999, // 30 second timeout
      }
    );

    console.log(' [ChatService] Response received successfully!');
    console.log(' [ChatService] Status:', response.status);
    console.log(' [ChatService] Response data:', response.data);

    // Save to local storage for debugging
    localStorage.setItem('treeResponse', JSON.stringify(response.data, null, 2));

    return response.data;
  } catch (error: any) {
    console.error(' [ChatService] Error sending message:', error);

    if (axios.isAxiosError(error)) {
      console.error(' [ChatService] Axios Error Details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        endpoint: error.config?.url,
      });
    }

    throw error;
  }
};

/**
 * Check if we should use mock mode
 */
export const shouldUseMockMode = (): boolean => {
  const mockModeEnv = import.meta.env.VITE_MOCK_MODE;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const useMockMode = mockModeEnv === 'true';

  console.log('🔍 [ChatService] Environment Check:');
  console.log('   - VITE_MOCK_MODE:', mockModeEnv);
  console.log('   - VITE_API_BASE_URL:', apiBaseUrl);
  console.log('   - Using Mock Mode:', useMockMode);

  return useMockMode;
};
