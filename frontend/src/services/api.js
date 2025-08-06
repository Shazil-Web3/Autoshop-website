const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    if (typeof window === 'undefined') {
      return {
        'Content-Type': 'application/json',
      };
    }
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

  // Product Request Methods

  // Create a new product request (for dealers/agents)
  async createProductRequest(requestData) {
    const response = await fetch(`${this.baseURL}/product-requests`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(requestData),
    });
    return this.handleResponse(response);
  }

  // Get my product requests (for dealers/agents)
  async getMyProductRequests(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${this.baseURL}/product-requests/my-requests?${queryString}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Admin: Get all product requests
  async getAllProductRequests(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${this.baseURL}/product-requests/admin/all?${queryString}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Admin: Get pending requests count
  async getPendingProductRequestsCount() {
    const response = await fetch(`${this.baseURL}/product-requests/admin/pending-count`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Admin: Get specific product request
  async getProductRequestById(requestId) {
    const response = await fetch(`${this.baseURL}/product-requests/admin/${requestId}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse(response);
  }

  // Admin: Approve product request
  async approveProductRequest(requestId, adminNotes = '') {
    const response = await fetch(`${this.baseURL}/product-requests/admin/${requestId}/approve`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ adminNotes }),
    });
    return this.handleResponse(response);
  }

  // Admin: Reject product request
  async rejectProductRequest(requestId, rejectionReason, adminNotes = '') {
    const response = await fetch(`${this.baseURL}/product-requests/admin/${requestId}/reject`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ rejectionReason, adminNotes }),
    });
    return this.handleResponse(response);
  }

  // Admin: Edit and approve product request
  async editAndApproveProductRequest(requestId, productData, adminNotes = '') {
    const response = await fetch(`${this.baseURL}/product-requests/admin/${requestId}/edit-approve`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ productData, adminNotes }),
    });
    return this.handleResponse(response);
  }

  // Check if user is authenticated
  isAuthenticated() {
    if (typeof window === 'undefined') {
      return false;
    }
    return !!localStorage.getItem('token');
  }

  // Get current user from localStorage
  getCurrentUser() {
    if (typeof window === 'undefined') {
      return null;
    }
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Logout
  logout() {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Set auth data after login/register
  setAuthData(data) {
    if (typeof window === 'undefined') {
      return;
    }
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }
  }
}

export default new ApiService(); 