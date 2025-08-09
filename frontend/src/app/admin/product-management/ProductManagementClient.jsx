"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import apiService from '../../../services/api';
import { 
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export default function ProductManagementClient({ initialTab }) {
  const router = useRouter();
  const [vehicles, setVehicles] = useState([]);
  const [parts, setParts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const user = apiService.getCurrentUser();
    if (!user || user.role !== 'admin') {
      router.push('/login');
      return;
    }
    if (initialTab === 'vehicles') setSelectedCategory('vehicles');
    if (initialTab === 'parts') setSelectedCategory('parts');
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTab]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [vehiclesData, partsData] = await Promise.all([
        apiService.getAllVehicles(),
        apiService.getAllParts()
      ]);
      setVehicles(Array.isArray(vehiclesData) ? vehiclesData : vehiclesData.vehicles || vehiclesData);
      setParts(Array.isArray(partsData) ? partsData : partsData.parts || partsData);
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage('Error loading products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId, type) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        if (type === 'vehicle') {
          await apiService.deleteVehicle(productId);
        } else {
          await apiService.deletePart(productId);
        }
        setMessage('Product deleted successfully');
        loadData();
      } catch (error) {
        setMessage(error.message || 'Error deleting product');
      }
    }
  };

  const getAllProducts = () => {
    if (selectedCategory === 'all') {
      return [
        ...vehicles.map(v => ({ ...v, type: 'vehicle' })),
        ...parts.map(p => ({ ...p, type: 'part' }))
      ];
    } else if (selectedCategory === 'vehicles') {
      return vehicles.map(v => ({ ...v, type: 'vehicle' }));
    } else {
      return parts.map(p => ({ ...p, type: 'part' }));
    }
  };

  const products = getAllProducts();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Back to Admin</span>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                <p className="text-gray-600 mt-2">Edit, delete, and manage existing products</p>
              </div>
            </div>
            <Link
              href="/admin/add-product"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Add Product</span>
            </Link>
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

          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>📦</span>
              <span>All Products</span>
              <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                {vehicles.length + parts.length}
              </span>
            </button>
            <button
              onClick={() => setSelectedCategory('vehicles')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'vehicles'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>🚗</span>
              <span>Vehicles</span>
              <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                {vehicles.length}
              </span>
            </button>
            <button
              onClick={() => setSelectedCategory('parts')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'parts'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>🔧</span>
              <span>Parts</span>
              <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                {parts.length}
              </span>
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedCategory === 'all' ? 'All Products' : 
               selectedCategory === 'vehicles' ? 'Vehicles' : 'Parts'}
              <span className="text-gray-500 ml-2">({getAllProducts().length})</span>
            </h2>
          </div>
          
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          ) : getAllProducts().length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                {selectedCategory === 'all' 
                  ? 'No products have been added yet.' 
                  : `No ${selectedCategory} found.`
                }
              </p>
              <Link
                href="/admin/add-product"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Add First Product</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={`${product.type}-${product._id}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-16">
                            {product.images && product.images[0] ? (
                              <img
                                className="h-12 w-16 object-cover rounded"
                                src={product.images[0]}
                                alt={product.title || product.name}
                              />
                            ) : (
                              <div className="h-12 w-16 bg-gray-200 rounded flex items-center justify-center">
                                {product.type === 'vehicle' ? (
                                  <TruckIcon className="w-6 h-6 text-gray-400" />
                                ) : (
                                  <WrenchScrewdriverIcon className="w-6 h-6 text-gray-400" />
                                )}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">
                              {product.title || product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {(product.description || '').substring(0, 50)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product.type === 'vehicle' ? (
                            <TruckIcon className="w-4 h-4 text-blue-500 mr-2" />
                          ) : (
                            <WrenchScrewdriverIcon className="w-4 h-4 text-green-500 mr-2" />
                          )}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            product.type === 'vehicle' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {product.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {typeof product.price === 'number' ? `$${product.price.toLocaleString()}` : (product.price || '-')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {product.refNo || product.stockNo || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.location || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View Product"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            className="text-yellow-600 hover:text-yellow-900 p-1"
                            title="Edit Product"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id, product.type)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Product"
                          >
                            <TrashIcon className="w-4 h-4" />
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
      </div>
    </div>
  );
} 