const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Helper method to handle responses
  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  }

  // User Registration
  async registerUser(userData) {
    const response = await fetch(`${this.baseURL}/auth/register/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return this.handleResponse(response);
  }

  // Agent Registration
  async registerAgent(agentData) {
    const formData = new FormData();
    
    // Add all text fields
    Object.keys(agentData).forEach(key => {
      if (key !== 'fileUpload' && agentData[key] !== null) {
        formData.append(key, agentData[key]);
      }
    });
    
    // Add file if exists
    if (agentData.fileUpload) {
      formData.append('fileUpload', agentData.fileUpload);
    }

    const response = await fetch(`${this.baseURL}/auth/register/agent`, {
      method: 'POST',
      body: formData,
    });
    return this.handleResponse(response);
  }

  // Dealer Registration
  async registerDealer(dealerData) {
    const formData = new FormData();
    
    // Add all text fields
    Object.keys(dealerData).forEach(key => {
      if (key !== 'fileUpload' && dealerData[key] !== null) {
        formData.append(key, dealerData[key]);
      }
    });
    
    // Add file if exists
    if (dealerData.fileUpload) {
      formData.append('fileUpload', dealerData.fileUpload);
    }

    const response = await fetch(`${this.baseURL}/auth/register/dealer`, {
      method: 'POST',
      body: formData,
    });
    return this.handleResponse(response);
  }

  // Login
  async login(credentials) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    return this.handleResponse(response);
  }

  // Get User Profile
  async getProfile() {
    const response = await fetch(`${this.baseURL}/auth/profile`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Update Profile
  async updateProfile(profileData) {
    const response = await fetch(`${this.baseURL}/auth/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData),
    });
    return this.handleResponse(response);
  }

  // Change Password
  async changePassword(passwordData) {
    const response = await fetch(`${this.baseURL}/auth/change-password`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(passwordData),
    });
    return this.handleResponse(response);
  }

  // Admin: Get Pending Applications
  async getPendingApplications() {
    const response = await fetch(`${this.baseURL}/auth/pending-applications`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Admin: Approve Application
  async approveApplication(approvalData) {
    const response = await fetch(`${this.baseURL}/auth/approve-application`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(approvalData),
    });
    return this.handleResponse(response);
  }

  // Admin: Reject Application
  async rejectApplication(rejectionData) {
    const response = await fetch(`${this.baseURL}/auth/reject-application`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(rejectionData),
    });
    return this.handleResponse(response);
  }

  // Admin: Get All Users
  async getAllUsers() {
    const response = await fetch(`${this.baseURL}/auth/all-users`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Admin: Suspend User
  async suspendUser(userId) {
    const response = await fetch(`${this.baseURL}/auth/suspend-user`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ userId }),
    });
    return this.handleResponse(response);
  }

  // Admin: Activate User
  async activateUser(userId) {
    const response = await fetch(`${this.baseURL}/auth/activate-user`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ userId }),
    });
    return this.handleResponse(response);
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  // Get current user from localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Set auth data after login/register
  setAuthData(data) {
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
  }
}

export default new ApiService(); 