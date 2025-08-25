import { User, Reminder, BloodRequest, ChatMessage } from '../types';

// User Management
export const saveUser = (user: User): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
  
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem('users', JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

export const getUsers = (): User[] => {
  const usersStr = localStorage.getItem('users');
  return usersStr ? JSON.parse(usersStr) : [];
};

export const loginUser = (email: string, _password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  
  // In a real app, you'd verify the password hash
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  
  return null;
};

export const logoutUser = (): void => {
  localStorage.removeItem('currentUser');
};

// Reminders Management
export const saveReminder = (reminder: Reminder): void => {
  const reminders = getReminders();
  const existingIndex = reminders.findIndex(r => r.id === reminder.id);
  
  if (existingIndex >= 0) {
    reminders[existingIndex] = reminder;
  } else {
    reminders.push(reminder);
  }
  
  localStorage.setItem('reminders', JSON.stringify(reminders));
};

export const getReminders = (): Reminder[] => {
  const remindersStr = localStorage.getItem('reminders');
  return remindersStr ? JSON.parse(remindersStr) : [];
};

export const getUserReminders = (userId: string): Reminder[] => {
  return getReminders().filter(r => r.userId === userId);
};

export const deleteReminder = (id: string): void => {
  const reminders = getReminders().filter(r => r.id !== id);
  localStorage.setItem('reminders', JSON.stringify(reminders));
};

// Blood Requests Management
export const saveBloodRequest = (request: BloodRequest): void => {
  const requests = getBloodRequests();
  requests.push(request);
  localStorage.setItem('bloodRequests', JSON.stringify(requests));
};

export const getBloodRequests = (): BloodRequest[] => {
  const requestsStr = localStorage.getItem('bloodRequests');
  return requestsStr ? JSON.parse(requestsStr) : [];
};

// Chat Messages Management
export const saveChatMessage = (message: ChatMessage): void => {
  const messages = getChatMessages();
  messages.push(message);
  localStorage.setItem('chatMessages', JSON.stringify(messages));
};

export const getChatMessages = (): ChatMessage[] => {
  const messagesStr = localStorage.getItem('chatMessages');
  return messagesStr ? JSON.parse(messagesStr) : [];
};

export const clearChatMessages = (): void => {
  localStorage.removeItem('chatMessages');
};