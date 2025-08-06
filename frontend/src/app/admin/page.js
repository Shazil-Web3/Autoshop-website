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
  DocumentTextIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const AdminPage = () => {
  const router = useRouter();
  const [pendingApplications, setPendingApplications] = useState([]);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [dealersCount, setDealersCount] = useState(0);
  const [agentsCount, setAgentsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user is admin
  useEffect(() => {
    const user = apiService.getCurrentUser();
    setCurrentUser(user);
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }
    loadData();
  }, [router]);

  const handleLogout = () => {
    apiService.logout();
    router.push('/login');
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load data without showing errors
      const [applications, pendingCount] = await Promise.all([
        apiService.getPendingApplications().catch(() => []),
        apiService.getPendingProductRequestsCount().catch(() => ({ pendingCount: 0 }))
      ]);
      setPendingApplications(applications || []);
      setPendingRequestsCount(pendingCount?.pendingCount || 0);
      
      // Set mock counts for dealers and agents (you can replace with actual API calls)
      setDealersCount(5); // Mock data
      setAgentsCount(3);  // Mock data
    } catch (error) {
      // Silently handle errors
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const adminCards = [
    {
      id: 'product-requests',
      title: 'Product Requests',
      description: `Manage ${pendingRequestsCount} pending product requests from dealers`,
      icon: DocumentTextIcon,
      color: 'bg-blue-500',
      href: '/admin/product-requests',
      count: pendingRequestsCount
    },
    {
      id: 'dashboard',
      title: 'Dashboard Overview',
      description: 'View all products and system statistics',
      icon: ChartBarIcon,
      color: 'bg-green-500',
      href: '/admin/dashboard'
    },
    {
      id: 'account-requests',
      title: 'Account Requests',
      description: `Review and approve ${pendingApplications.length} agent/dealer applications`,
      icon: UserGroupIcon,
      color: 'bg-yellow-500',
      href: '/admin/account-requests',
      count: pendingApplications.length
    },
    {
      id: 'product-management',
      title: 'Product Management',
      description: 'Edit, delete, and manage existing products',
      icon: CogIcon,
      color: 'bg-purple-500',
      href: '/admin/product-management'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome to the AutoShop administration panel</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Welcome, {currentUser?.firstName || 'Admin'}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
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
              <h3 className="text-lg font-medium text-blue-900">Navigation Instructions</h3>
              <p className="text-blue-700 mt-1">Click on any of the cards below to navigate to the respective admin section</p>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminCards.map((card) => (
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

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserGroupIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Dealers</p>
                <p className="text-2xl font-semibold text-gray-900">{dealersCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <ClipboardDocumentListIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Agents</p>
                <p className="text-2xl font-semibold text-gray-900">{agentsCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <ChartBarIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-semibold text-gray-900">{dealersCount + agentsCount + 1}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 