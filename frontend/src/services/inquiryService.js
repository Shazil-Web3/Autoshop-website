import { api } from '../lib/api';

export const inquiryService = {
  submitInquiry: async (inquiryData) => {
    return await api.post('/inquiries', inquiryData);
  },
  
  getInquiries: async () => {
    return await api.get('/inquiries');
  }
}; 