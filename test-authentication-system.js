const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const API_BASE_URL = 'http://localhost:5000/api';
const TEST_RESULTS_FILE = 'test-results.json';

class AuthenticationSystemTester {
  constructor() {
    this.results = {
      summary: {
        total: 0,
        passed: 0,
        failed: 0,
        errors: []
      },
      tests: []
    };
    this.adminToken = null;
    this.userToken = null;
    this.agentToken = null;
    this.dealerToken = null;
    this.testUsers = {
      admin: { email: 'admin@autoshop.com', password: 'admin123' },
      user: { email: 'testuser@example.com', password: 'password123' },
      agent: { email: 'testagent@example.com', password: 'password123' },
      dealer: { email: 'testdealer@example.com', password: 'password123' }
    };
  }

  // Helper method to log test results
  logTest(testName, success, error = null, data = null) {
    const testResult = {
      name: testName,
      success,
      timestamp: new Date().toISOString(),
      data
    };

    if (error) {
      testResult.error = error.message || error;
    }

    this.results.tests.push(testResult);
    this.results.summary.total++;

    if (success) {
      this.results.summary.passed++;
      console.log(`✅ ${testName} - PASSED`);
    } else {
      this.results.summary.failed++;
      console.log(`❌ ${testName} - FAILED: ${error}`);
    }
  }

  // Helper method to make API calls
  async makeRequest(method, endpoint, data = null, token = null) {
    try {
      const config = {
        method,
        url: `${API_BASE_URL}${endpoint}`,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (data) {
        config.data = data;
      }

      const response = await axios(config);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      };
    }
  }

  // Test 1: User Registration
  async testUserRegistration() {
    const userData = {
      firstName: 'Test',
      lastName: 'User',
      email: this.testUsers.user.email,
      password: this.testUsers.user.password
    };

    const result = await this.makeRequest('POST', '/auth/register/user', userData);
    
    if (result.success) {
      this.logTest('User Registration', true, null, result.data);
    } else {
      this.logTest('User Registration', false, result.error);
    }
  }

  // Test 2: Agent Registration
  async testAgentRegistration() {
    const agentData = {
      firstName: 'Test',
      lastName: 'Agent',
      email: this.testUsers.agent.email,
      phone: '+1234567890',
      county: 'Test County',
      city: 'Test City',
      loginId: 'agent123',
      password: this.testUsers.agent.password
    };

    const result = await this.makeRequest('POST', '/auth/register/agent', agentData);
    
    if (result.success) {
      this.logTest('Agent Registration', true, null, result.data);
    } else {
      this.logTest('Agent Registration', false, result.error);
    }
  }

  // Test 3: Dealer Registration
  async testDealerRegistration() {
    const dealerData = {
      firstName: 'Test',
      lastName: 'Dealer',
      companyName: 'Test Auto Dealership',
      companyAddress: '123 Test Street, Test City',
      email: this.testUsers.dealer.email,
      phone: '+1234567890',
      county: 'Test County',
      city: 'Test City',
      loginId: 'dealer123',
      password: this.testUsers.dealer.password
    };

    const result = await this.makeRequest('POST', '/auth/register/dealer', dealerData);
    
    if (result.success) {
      this.logTest('Dealer Registration', true, null, result.data);
    } else {
      this.logTest('Dealer Registration', false, result.error);
    }
  }

  // Test 4: Admin Login
  async testAdminLogin() {
    const result = await this.makeRequest('POST', '/auth/login', this.testUsers.admin);
    
    if (result.success && result.data.token) {
      this.adminToken = result.data.token;
      this.logTest('Admin Login', true, null, { user: result.data.user });
    } else {
      this.logTest('Admin Login', false, result.error);
    }
  }

  // Test 5: User Login
  async testUserLogin() {
    const result = await this.makeRequest('POST', '/auth/login', this.testUsers.user);
    
    if (result.success && result.data.token) {
      this.userToken = result.data.token;
      this.logTest('User Login', true, null, { user: result.data.user });
    } else {
      this.logTest('User Login', false, result.error);
    }
  }

  // Test 6: Agent Login (should fail - pending approval)
  async testAgentLoginPending() {
    const result = await this.makeRequest('POST', '/auth/login', this.testUsers.agent);
    
    if (!result.success && result.error.includes('pending')) {
      this.logTest('Agent Login (Pending Approval)', true, null, { error: result.error });
    } else {
      this.logTest('Agent Login (Pending Approval)', false, 'Expected pending approval error');
    }
  }

  // Test 7: Dealer Login (should fail - pending approval)
  async testDealerLoginPending() {
    const result = await this.makeRequest('POST', '/auth/login', this.testUsers.dealer);
    
    if (!result.success && result.error.includes('pending')) {
      this.logTest('Dealer Login (Pending Approval)', true, null, { error: result.error });
    } else {
      this.logTest('Dealer Login (Pending Approval)', false, 'Expected pending approval error');
    }
  }

  // Test 8: Get Pending Applications (Admin)
  async testGetPendingApplications() {
    const result = await this.makeRequest('GET', '/auth/pending-applications', null, this.adminToken);
    
    if (result.success) {
      this.logTest('Get Pending Applications', true, null, { count: result.data.length });
    } else {
      this.logTest('Get Pending Applications', false, result.error);
    }
  }

  // Test 9: Approve Agent Application (Admin)
  async testApproveAgent() {
    // First get pending applications
    const pendingResult = await this.makeRequest('GET', '/auth/pending-applications', null, this.adminToken);
    
    if (pendingResult.success) {
      const agentApp = pendingResult.data.find(app => app.role === 'agent');
      
      if (agentApp) {
        const approveData = {
          userId: agentApp._id,
          agentId: `AG${Date.now()}`
        };

        const result = await this.makeRequest('POST', '/auth/approve-application', approveData, this.adminToken);
        
        if (result.success) {
          this.logTest('Approve Agent Application', true, null, result.data);
        } else {
          this.logTest('Approve Agent Application', false, result.error);
        }
      } else {
        this.logTest('Approve Agent Application', false, 'No agent application found');
      }
    } else {
      this.logTest('Approve Agent Application', false, 'Failed to get pending applications');
    }
  }

  // Test 10: Approve Dealer Application (Admin)
  async testApproveDealer() {
    // First get pending applications
    const pendingResult = await this.makeRequest('GET', '/auth/pending-applications', null, this.adminToken);
    
    if (pendingResult.success) {
      const dealerApp = pendingResult.data.find(app => app.role === 'dealer');
      
      if (dealerApp) {
        const approveData = {
          userId: dealerApp._id
        };

        const result = await this.makeRequest('POST', '/auth/approve-application', approveData, this.adminToken);
        
        if (result.success) {
          this.logTest('Approve Dealer Application', true, null, result.data);
        } else {
          this.logTest('Approve Dealer Application', false, result.error);
        }
      } else {
        this.logTest('Approve Dealer Application', false, 'No dealer application found');
      }
    } else {
      this.logTest('Approve Dealer Application', false, 'Failed to get pending applications');
    }
  }

  // Test 11: Agent Login (after approval)
  async testAgentLoginApproved() {
    const result = await this.makeRequest('POST', '/auth/login', this.testUsers.agent);
    
    if (result.success && result.data.token) {
      this.agentToken = result.data.token;
      this.logTest('Agent Login (After Approval)', true, null, { user: result.data.user });
    } else {
      this.logTest('Agent Login (After Approval)', false, result.error);
    }
  }

  // Test 12: Dealer Login (after approval)
  async testDealerLoginApproved() {
    const result = await this.makeRequest('POST', '/auth/login', this.testUsers.dealer);
    
    if (result.success && result.data.token) {
      this.dealerToken = result.data.token;
      this.logTest('Dealer Login (After Approval)', true, null, { user: result.data.user });
    } else {
      this.logTest('Dealer Login (After Approval)', false, result.error);
    }
  }

  // Test 13: Get User Profile
  async testGetUserProfile() {
    const result = await this.makeRequest('GET', '/auth/profile', null, this.userToken);
    
    if (result.success) {
      this.logTest('Get User Profile', true, null, { user: result.data });
    } else {
      this.logTest('Get User Profile', false, result.error);
    }
  }

  // Test 14: Update User Profile
  async testUpdateUserProfile() {
    const updateData = {
      firstName: 'Updated',
      lastName: 'User',
      phone: '+9876543210',
      county: 'Updated County',
      city: 'Updated City'
    };

    const result = await this.makeRequest('PUT', '/auth/profile', updateData, this.userToken);
    
    if (result.success) {
      this.logTest('Update User Profile', true, null, result.data);
    } else {
      this.logTest('Update User Profile', false, result.error);
    }
  }

  // Test 15: Change Password
  async testChangePassword() {
    const passwordData = {
      currentPassword: this.testUsers.user.password,
      newPassword: 'newpassword123'
    };

    const result = await this.makeRequest('PUT', '/auth/change-password', passwordData, this.userToken);
    
    if (result.success) {
      this.logTest('Change Password', true, null, result.data);
      // Update the stored password for future tests
      this.testUsers.user.password = 'newpassword123';
    } else {
      this.logTest('Change Password', false, result.error);
    }
  }

  // Test 16: Get All Users (Admin)
  async testGetAllUsers() {
    const result = await this.makeRequest('GET', '/auth/all-users', null, this.adminToken);
    
    if (result.success) {
      this.logTest('Get All Users', true, null, { count: result.data.length });
    } else {
      this.logTest('Get All Users', false, result.error);
    }
  }

  // Test 17: Suspend User (Admin)
  async testSuspendUser() {
    const allUsersResult = await this.makeRequest('GET', '/auth/all-users', null, this.adminToken);
    
    if (allUsersResult.success) {
      const userToSuspend = allUsersResult.data.find(user => user.role === 'user');
      
      if (userToSuspend) {
        const suspendData = { userId: userToSuspend._id };
        const result = await this.makeRequest('POST', '/auth/suspend-user', suspendData, this.adminToken);
        
        if (result.success) {
          this.logTest('Suspend User', true, null, result.data);
        } else {
          this.logTest('Suspend User', false, result.error);
        }
      } else {
        this.logTest('Suspend User', false, 'No user found to suspend');
      }
    } else {
      this.logTest('Suspend User', false, 'Failed to get all users');
    }
  }

  // Test 18: Activate User (Admin)
  async testActivateUser() {
    const allUsersResult = await this.makeRequest('GET', '/auth/all-users', null, this.adminToken);
    
    if (allUsersResult.success) {
      const suspendedUser = allUsersResult.data.find(user => user.status === 'suspended');
      
      if (suspendedUser) {
        const activateData = { userId: suspendedUser._id };
        const result = await this.makeRequest('POST', '/auth/activate-user', activateData, this.adminToken);
        
        if (result.success) {
          this.logTest('Activate User', true, null, result.data);
        } else {
          this.logTest('Activate User', false, result.error);
        }
      } else {
        this.logTest('Activate User', false, 'No suspended user found');
      }
    } else {
      this.logTest('Activate User', false, 'Failed to get all users');
    }
  }

  // Test 19: Reject Application (Admin)
  async testRejectApplication() {
    // Create a new agent application to reject
    const newAgentData = {
      firstName: 'Reject',
      lastName: 'Agent',
      email: 'rejectagent@example.com',
      phone: '+1234567890',
      county: 'Test County',
      city: 'Test City',
      loginId: 'rejectagent123',
      password: 'password123'
    };

    await this.makeRequest('POST', '/auth/register/agent', newAgentData);

    // Get pending applications and reject the new one
    const pendingResult = await this.makeRequest('GET', '/auth/pending-applications', null, this.adminToken);
    
    if (pendingResult.success) {
      const agentToReject = pendingResult.data.find(app => app.email === 'rejectagent@example.com');
      
      if (agentToReject) {
        const rejectData = {
          userId: agentToReject._id,
          rejectionReason: 'Test rejection - insufficient documentation'
        };

        const result = await this.makeRequest('POST', '/auth/reject-application', rejectData, this.adminToken);
        
        if (result.success) {
          this.logTest('Reject Application', true, null, result.data);
        } else {
          this.logTest('Reject Application', false, result.error);
        }
      } else {
        this.logTest('Reject Application', false, 'No agent application found to reject');
      }
    } else {
      this.logTest('Reject Application', false, 'Failed to get pending applications');
    }
  }

  // Test 20: Authentication Middleware Tests
  async testAuthenticationMiddleware() {
    // Test accessing protected route without token
    const noTokenResult = await this.makeRequest('GET', '/auth/profile');
    if (!noTokenResult.success && noTokenResult.error.includes('Not authorized')) {
      this.logTest('Authentication Middleware - No Token', true, null, { error: noTokenResult.error });
    } else {
      this.logTest('Authentication Middleware - No Token', false, 'Expected unauthorized error');
    }

    // Test accessing admin route with user token
    const userAdminResult = await this.makeRequest('GET', '/auth/all-users', null, this.userToken);
    if (!userAdminResult.success && userAdminResult.error.includes('Not authorized as admin')) {
      this.logTest('Authentication Middleware - User Accessing Admin Route', true, null, { error: userAdminResult.error });
    } else {
      this.logTest('Authentication Middleware - User Accessing Admin Route', false, 'Expected admin authorization error');
    }
  }

  // Test 21: Duplicate Registration Prevention
  async testDuplicateRegistration() {
    const duplicateUserData = {
      firstName: 'Duplicate',
      lastName: 'User',
      email: this.testUsers.user.email, // Use existing email
      password: 'password123'
    };

    const result = await this.makeRequest('POST', '/auth/register/user', duplicateUserData);
    
    if (!result.success && result.error.includes('already exists')) {
      this.logTest('Duplicate Registration Prevention', true, null, { error: result.error });
    } else {
      this.logTest('Duplicate Registration Prevention', false, 'Expected duplicate user error');
    }
  }

  // Test 22: Invalid Login Credentials
  async testInvalidLoginCredentials() {
    const invalidCredentials = {
      email: 'nonexistent@example.com',
      password: 'wrongpassword'
    };

    const result = await this.makeRequest('POST', '/auth/login', invalidCredentials);
    
    if (!result.success && result.error.includes('Invalid credentials')) {
      this.logTest('Invalid Login Credentials', true, null, { error: result.error });
    } else {
      this.logTest('Invalid Login Credentials', false, 'Expected invalid credentials error');
    }
  }

  // Save test results to file
  saveResults() {
    try {
      fs.writeFileSync(TEST_RESULTS_FILE, JSON.stringify(this.results, null, 2));
      console.log(`\n📄 Test results saved to ${TEST_RESULTS_FILE}`);
    } catch (error) {
      console.error('Error saving test results:', error);
    }
  }

  // Print summary
  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('🔍 AUTHENTICATION SYSTEM TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${this.results.summary.total}`);
    console.log(`✅ Passed: ${this.results.summary.passed}`);
    console.log(`❌ Failed: ${this.results.summary.failed}`);
    console.log(`📊 Success Rate: ${((this.results.summary.passed / this.results.summary.total) * 100).toFixed(2)}%`);
    
    if (this.results.summary.failed > 0) {
      console.log('\n❌ FAILED TESTS:');
      this.results.tests
        .filter(test => !test.success)
        .forEach(test => {
          console.log(`  - ${test.name}: ${test.error}`);
        });
    }
    
    console.log('='.repeat(60));
  }

  // Run all tests
  async runAllTests() {
    console.log('🚀 Starting Authentication System Tests...\n');

    try {
      // Registration tests
      await this.testUserRegistration();
      await this.testAgentRegistration();
      await this.testDealerRegistration();

      // Login tests
      await this.testAdminLogin();
      await this.testUserLogin();
      await this.testAgentLoginPending();
      await this.testDealerLoginPending();

      // Admin approval tests
      await this.testGetPendingApplications();
      await this.testApproveAgent();
      await this.testApproveDealer();

      // Post-approval login tests
      await this.testAgentLoginApproved();
      await this.testDealerLoginApproved();

      // Profile management tests
      await this.testGetUserProfile();
      await this.testUpdateUserProfile();
      await this.testChangePassword();

      // Admin management tests
      await this.testGetAllUsers();
      await this.testSuspendUser();
      await this.testActivateUser();
      await this.testRejectApplication();

      // Security and validation tests
      await this.testAuthenticationMiddleware();
      await this.testDuplicateRegistration();
      await this.testInvalidLoginCredentials();

    } catch (error) {
      console.error('Test execution error:', error);
      this.results.summary.errors.push(error.message);
    }

    this.printSummary();
    this.saveResults();
  }
}

// Run the tests
async function main() {
  const tester = new AuthenticationSystemTester();
  await tester.runAllTests();
}

// Check if running directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = AuthenticationSystemTester; 