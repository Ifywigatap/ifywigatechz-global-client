import { apiService } from './api';

export const sendMessage = async (message, history = []) => {
  try {
    const response = await apiService.post('/chat', { message, history });
    return response;
  } catch (error) {
    console.error('Error sending message to Chatify:', error);
    return null;
  }
};

export const getQuickReplies = () => {
  return ["Course Pricing", "MERN Stack Syllabus", "Contact Support"];
};