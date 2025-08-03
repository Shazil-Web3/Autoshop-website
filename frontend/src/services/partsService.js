import { api } from '../lib/api';

export const partsService = {
  getAllParts: async () => {
    return await api.get('/parts');
  },
  
  getPartById: async (id) => {
    return await api.get(`/parts/${id}`);
  },
  
  searchParts: async (filters) => {
    return await api.post('/parts/search', filters);
  }
}; 