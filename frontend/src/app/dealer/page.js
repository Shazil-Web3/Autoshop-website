"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import apiService from '../../services/api';
import { 
  PlusIcon,
  DocumentTextIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ChartBarIcon,
  UserIcon
} from '@heroicons/react/24/outline';

const DealerPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [myRequests, setMyRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Check if user is dealer
  useEffect(() => {
    const currentUser = apiService.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    if (currentUser.role !== 'dealer') {
      router.push('/');
      return;
    }
    
    if (currentUser.status !== 'approved') {
      router.push('/');
      return;
    }

    setUser(currentUser);
    loadData();
  }, [router]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const requests = await apiService.getMyProductRequests();
      setMyRequests(requests.requests || []);
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage('Error loading your data');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case 'edited':
        return <CheckCircleIcon className="w-5 h-5 text-blue-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'edited':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const dealerCards = [
    {
      id: 'submit-product',
      title: 'Submit New Product',
      description: 'Add a new vehicle or part for admin review',
      icon: PlusIcon,
      color: 'bg-blue-500',
      href: '/submit-product-request'
    },
    {
      id: 'my-requests',
      title: 'My Product Requests',
      description: `View status of your ${myRequests.length} submitted products`,
      icon: DocumentTextIcon,
      color: 'bg-green-500',
      href: '/my-product-requests',
      count: myRequests.length
    },
    {
      id: 'profile',
      title: 'My Profile',
      description: 'View and update your dealer information',
      icon: UserIcon,
      color: 'bg-purple-500',
      href: '/profile'
    }
  ];

  const pendingRequests = myRequests.filter(req => req.status === 'pending');
  const approvedRequests = myRequests.filter(req => req.status === 'approved');
  const rejectedRequests = myRequests.filter(req => req.status === 'rejected');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dealer Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.firstName} {user?.lastName}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {user?.companyName || 'Dealer'}
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

        {/* Navigation Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-900">Quick Actions</h3>
              <p className="text-blue-700 mt-1">Click on any of the cards below to access different features</p>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {dealerCards.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all hover:shadow-md hover:scale-105 border border-gray-200 hover:border-blue-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <card.icon className="w-8 h-8 text-white" />
                </div>
                {card.count !== undefined && card.count > 0 && (
                  <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {card.count}
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <span>Click to access</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DocumentTextIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-semibold text-gray-900">{myRequests.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-semibold text-gray-900">{pendingRequests.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-semibold text-gray-900">{approvedRequests.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-semibold text-gray-900">{rejectedRequests.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Requests */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Product Requests</h2>
              <Link
                href="/my-product-requests"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All
              </Link>
            </div>
          </div>
          
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading your requests...</p>
            </div>
          ) : myRequests.length === 0 ? (
            <div className="p-8 text-center">
              <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No product requests yet</h3>
              <p className="text-gray-600 mb-4">Start by submitting your first product for review.</p>
              <Link
                href="/submit-product-request"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Submit First Product</span>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {myRequests.slice(0, 5).map((request) => (
                <div key={request._id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        {request.requestType === 'vehicle' ? (
                          <TruckIcon className="w-5 h-5 text-blue-500 mr-2" />
                        ) : (
                          <WrenchScrewdriverIcon className="w-5 h-5 text-green-500 mr-2" />
                        )}
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{request.productData.title}</h3>
                          <p className="text-sm text-gray-500">${request.productData.price?.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        {getStatusIcon(request.status)}
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </div>
                      
                      <Link
                        href="/my-product-requests"
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View Details"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealerPage; 