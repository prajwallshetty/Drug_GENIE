import { User, Reminder, BloodRequest } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Token management
export const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const setToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('authToken');
};

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const token = getToken();
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Auth API
export const authAPI = {
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    age: number;
    bloodGroup: string;
    gender: string;
  }): Promise<{ user: User; token: string }> => {
    return apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<{ user: User; token: string }> => {
    return apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getProfile: async (): Promise<User> => {
    return apiRequest('/api/auth/profile');
  },
};

// Reminders API
export const remindersAPI = {
  getReminders: async (): Promise<Reminder[]> => {
    return apiRequest('/api/reminders');
  },

  createReminder: async (reminderData: Omit<Reminder, 'id' | 'userId'>): Promise<Reminder> => {
    return apiRequest('/api/reminders', {
      method: 'POST',
      body: JSON.stringify(reminderData),
    });
  },

  deleteReminder: async (id: string): Promise<void> => {
    return apiRequest(`/api/reminders/${id}`, {
      method: 'DELETE',
    });
  },
};

// Blood Requests API
export const bloodRequestsAPI = {
  getActiveRequests: async (): Promise<BloodRequest[]> => {
    return apiRequest('/api/blood-requests');
  },

  createRequest: async (requestData: Omit<BloodRequest, 'id' | 'requesterId' | 'requesterName' | 'createdAt' | 'status'>): Promise<BloodRequest> => {
    return apiRequest('/api/blood-requests', {
      method: 'POST',
      body: JSON.stringify(requestData),
    });
  },
};

// Axios-like API interface for compatibility
export const api = {
  get: async (endpoint: string) => {
    const data = await apiRequest(endpoint);
    return { data };
  },
  
  post: async (endpoint: string, body?: any) => {
    const data = await apiRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    return { data };
  },
  
  put: async (endpoint: string, body?: any) => {
    const data = await apiRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
    return { data };
  },
  
  delete: async (endpoint: string) => {
    const data = await apiRequest(endpoint, {
      method: 'DELETE',
    });
    return { data };
  },
};
