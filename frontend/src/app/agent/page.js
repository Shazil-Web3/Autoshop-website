"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import apiService from '../../services/api';
import { 
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  UserIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const AgentPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Check if user is agent
  useEffect(() => {
    const currentUser = apiService.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    
    if (currentUser.role !== 'agent') {
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
      // Load invoices data
      // Note: You'll need to add these methods to your API service
      // const invoicesData = await apiService.getMyInvoices();
      // setInvoices(invoicesData.invoices || []);
      
      // For now, using placeholder data
      setInvoices([]);
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage('Error loading your data');
    } finally {
      setIsLoading(false);
    }
  };

  const agentCards = [
    {
      id: 'create-invoice',
      title: 'Create Invoice',
      description: 'Generate a new invoice for customers',
      icon: PlusIcon,
      color: 'bg-blue-500',
      href: '/create-invoice'
    },
    {
      id: 'my-invoices',
      title: 'My Invoices',
      description: `View and manage your ${invoices.length} created invoices`,
      icon: DocumentTextIcon,
      color: 'bg-green-500',
      href: '/my-invoices',
      count: invoices.length
    },
    {
      id: 'profile',
      title: 'My Profile',
      description: 'View and update your agent information',
      icon: UserIcon,
      color: 'bg-purple-500',
      href: '/profile'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Agent Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.firstName} {user?.lastName}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Agent ID: {user?.agentId || 'N/A'}
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
          {agentCards.map((card) => (
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DocumentTextIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                <p className="text-2xl font-semibold text-gray-900">{invoices.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <ClipboardDocumentListIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-semibold text-gray-900">0</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ChartBarIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">$0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Invoices</h2>
              <Link
                href="/my-invoices"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All
              </Link>
            </div>
          </div>
          
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading your invoices...</p>
            </div>
          ) : invoices.length === 0 ? (
            <div className="p-8 text-center">
              <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices yet</h3>
              <p className="text-gray-600 mb-4">Start by creating your first invoice.</p>
              <Link
                href="/create-invoice"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Create First Invoice</span>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {invoices.slice(0, 5).map((invoice) => (
                <div key={invoice._id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <DocumentTextIcon className="w-5 h-5 text-blue-500 mr-2" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">Invoice #{invoice.invoiceNumber}</h3>
                          <p className="text-sm text-gray-500">{invoice.customerName}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium text-gray-900">
                        ${invoice.totalAmount?.toLocaleString()}
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        {new Date(invoice.createdAt).toLocaleDateString()}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/my-invoices/${invoice._id}`}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View Invoice"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Link>
                        <button
                          className="text-yellow-600 hover:text-yellow-900 p-1"
                          title="Edit Invoice"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete Invoice"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Agent Information */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Agent Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Personal Details</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {user?.firstName} {user?.lastName}</p>
                <p><span className="font-medium">Email:</span> {user?.email}</p>
                <p><span className="font-medium">Phone:</span> {user?.phone}</p>
                <p><span className="font-medium">Agent ID:</span> {user?.agentId || 'Not assigned'}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Location</h3>
              <div className="space-y-2">
                <p><span className="font-medium">City:</span> {user?.city}</p>
                <p><span className="font-medium">County:</span> {user?.county}</p>
                <p><span className="font-medium">Status:</span> 
                  <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {user?.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPage; 