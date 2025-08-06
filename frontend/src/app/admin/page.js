"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import apiService from '../../services/api';
import { 
  PlusIcon, 
  ChartBarIcon, 
  UserGroupIcon, 
  CogIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const AdminPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [pendingApplications, setPendingApplications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Check if user is admin
  useEffect(() => {
    const user = apiService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }
    loadData();
  }, [router]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [applications, users] = await Promise.all([
        apiService.getPendingApplications(),
        apiService.getAllUsers()
      ]);
      setPendingApplications(applications);
      setAllUsers(users);
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage('Error loading data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (userId, agentId = null) => {
    try {
      await apiService.approveApplication({ userId, agentId });
      setMessage('Application approved successfully');
      loadData();
    } catch (error) {
      setMessage('Error approving application');
    }
  };

  const handleReject = async (userId, rejectionReason) => {
    try {
      await apiService.rejectApplication({ userId, rejectionReason });
      setMessage('Application rejected successfully');
      loadData();
    } catch (error) {
      setMessage('Error rejecting application');
    }
  };

  const handleSuspend = async (userId) => {
    try {
      await apiService.suspendUser(userId);
      setMessage('User suspended successfully');
      loadData();
    } catch (error) {
      setMessage('Error suspending user');
    }
  };

  const handleActivate = async (userId) => {
    try {
      await apiService.activateUser(userId);
      setMessage('User activated successfully');
      loadData();
    } catch (error) {
      setMessage('Error activating user');
    }
  };

  const adminCards = [
    {
      id: 'dashboard',
      title: 'Dashboard Overview',
      description: 'View all products and system statistics',
      icon: ChartBarIcon,
      color: 'bg-blue-500',
      href: '/admin/dashboard'
    },
    {
      id: 'add-product',
      title: 'Add New Product',
      description: 'Add new products to the inventory',
      icon: PlusIcon,
      color: 'bg-green-500',
      href: '/admin/add-product'
    },
    {
      id: 'account-requests',
      title: 'Account Requests',
      description: 'Review and approve agent/dealer applications',
      icon: UserGroupIcon,
      color: 'bg-yellow-500'
    },
    {
      id: 'product-management',
      title: 'Product Management',
      description: 'Edit, delete, and manage existing products',
      icon: CogIcon,
      color: 'bg-purple-500',
      href: '/admin/dashboard'
    }
  ];

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {adminCards.map((card) => (
        <div
          key={card.id}
          className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all hover:shadow-md ${
            activeTab === card.id ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => {
            if (card.href) {
              router.push(card.href);
            } else {
              setActiveTab(card.id);
            }
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{card.description}</p>
            </div>
            <div className={`p-3 rounded-lg ${card.color}`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAccountRequests = () => (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          Pending Account Applications ({pendingApplications.length})
        </h2>
      </div>
      
      {isLoading ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading applications...</p>
        </div>
      ) : pendingApplications.length === 0 ? (
        <div className="p-8 text-center">
          <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No pending applications</h3>
          <p className="text-gray-600">All applications have been processed.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingApplications.map((application) => (
                <tr key={application._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {application.firstName} {application.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.loginId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      application.role === 'agent' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {application.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.email}</div>
                    <div className="text-sm text-gray-500">{application.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{application.city}</div>
                    <div className="text-sm text-gray-500">{application.county}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {application.fileUploadUrl ? (
                      <a
                        href={application.fileUploadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-900 text-sm"
                      >
                        View Document
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">No document</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleApprove(application._id, application.role === 'agent' ? `AG${Date.now()}` : null)}
                        className="text-green-600 hover:text-green-900 p-1"
                        title="Approve"
                      >
                        <CheckCircleIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          const reason = prompt('Enter rejection reason:');
                          if (reason) handleReject(application._id, reason);
                        }}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Reject"
                      >
                        <XCircleIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderUserManagement = () => (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">
          User Management ({allUsers.length})
        </h2>
      </div>
      
      {isLoading ? (
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading users...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.loginId || user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'agent' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'dealer' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      user.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                      user.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {user.status === 'suspended' ? (
                        <button
                          onClick={() => handleActivate(user._id)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Activate"
                        >
                          <CheckCircleIcon className="w-4 h-4" />
                        </button>
                      ) : user.role !== 'admin' ? (
                        <button
                          onClick={() => handleSuspend(user._id)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Suspend"
                        >
                          <XCircleIcon className="w-4 h-4" />
                        </button>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600 mt-2">Manage your AutoShop system</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Welcome, {apiService.getCurrentUser()?.firstName || 'Admin'}
              </span>
              <button
                onClick={() => {
                  apiService.logout();
                  router.push('/login');
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-1 rounded-full">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-blue-800 font-medium">{message}</span>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'account-requests' && renderAccountRequests()}
        {activeTab === 'user-management' && renderUserManagement()}
      </div>
    </div>
  );
};

export default AdminPage; 