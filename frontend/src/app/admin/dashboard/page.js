"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import apiService from '../../../services/api';
import { 
  ChartBarIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  ArrowLeftIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const DashboardPage = () => {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [parts, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is admin
  useEffect(() => {
    const user = apiService.getCurrentUser();
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
      const [vehiclesData, partsData] = await Promise.all([
        apiService.getAllVehicles().catch(() => []),
        apiService.getAllParts().catch(() => [])
      ]);
      setVehicles(Array.isArray(vehiclesData) ? vehiclesData : vehiclesData.vehicles || vehiclesData);
      setParts(Array.isArray(partsData) ? partsData : partsData.parts || partsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    {
      name: 'Total Vehicles',
      value: vehicles.length,
      icon: TruckIcon,
      color: 'bg-blue-500'
    },
    {
      name: 'Total Parts',
      value: parts.length,
      icon: WrenchScrewdriverIcon,
      color: 'bg-green-500'
    },
    {
      name: 'Total Products',
      value: vehicles.length + parts.length,
      icon: ChartBarIcon,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify_between mb-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Back to Admin</span>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-600 mt-2">View all products and system statistics</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Products Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vehicles */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Vehicles ({vehicles.length})</h2>
                <Link
                  href="/admin/product-management?tab=vehicles"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
            </div>
            
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading vehicles...</p>
              </div>
            ) : vehicles.length === 0 ? (
              <div className="p-8 text-center">
                <TruckIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No vehicles found</h3>
                <p className="text-gray-600">No vehicles have been added to the inventory yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {vehicles.slice(0, 5).map((vehicle) => (
                  <div key={vehicle._id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{vehicle.title}</h3>
                        <p className="text-sm text-gray-500">${vehicle.price?.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-900 p-1">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Parts */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Parts ({parts.length})</h2>
                <Link
                  href="/admin/product-management?tab=parts"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
            </div>
            
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading parts...</p>
              </div>
            ) : parts.length === 0 ? (
              <div className="p-8 text-center">
                <WrenchScrewdriverIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No parts found</h3>
                <p className="text-gray-600">No parts have been added to the inventory yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {parts.slice(0, 5).map((part) => (
                  <div key={part._id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{part.title}</h3>
                        <p className="text-sm text-gray-500">${part.price?.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1">
                          <EyeIcon className="w-4 h-4" />
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-900 p-1">
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1">
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 