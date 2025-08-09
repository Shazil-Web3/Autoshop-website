import { api } from '../lib/api';

export const vehicleService = {
  getInventory: async () => {
    return await api.get('/vehicles/inventory');
  },

  getAll: async () => {
    return await api.get('/vehicles');
  },

  getByCategory: async (category) => {
    return await api.get(`/vehicles/category/${category}`);
  },

  getById: async (id) => {
    return await api.get(`/vehicles/${id}`);
  },

  // For authenticated users (admin/dealer/agent) - these endpoints expect auth headers via different API helper if needed
}; 