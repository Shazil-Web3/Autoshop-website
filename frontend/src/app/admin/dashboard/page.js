"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useGlobalState } from '../../../context/GlobalStateContext';
import { PencilIcon, TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const { inventory, deleteProduct } = useGlobalState();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { value: 'all', label: 'All Products', icon: '📦' },
    { value: 'stockCars', label: 'Stock Cars', icon: '🚗' },
    { value: 'salvageVehicles', label: 'Salvage Vehicles', icon: '🚛' },
    { value: 'constructionMachinery', label: 'Construction Machinery', icon: '🏗️' },
    { value: 'bikes', label: 'Motorcycles', icon: '🏍️' }
  ];

  const getCategoryLabel = (category) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  const handleDelete = (category, productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(category, productId);
    }
  };

  const getAllProducts = () => {
    if (selectedCategory === 'all') {
      return Object.entries(inventory).flatMap(([category, products]) =>
        products.map(product => ({ ...product, category }))
      );
    }
    return inventory[selectedCategory]?.map(product => ({ ...product, category: selectedCategory })) || [];
  };

  const products = getAllProducts();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage your inventory products</p>
            </div>
            <Link 
              href="/admin"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-base font-medium transition-colors flex items-center space-x-2"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Add New Product</span>
            </Link>
          </div>

          {/* Category Filter */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
                {category.value !== 'all' && (
                  <span className="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
                    {inventory[category.value]?.length || 0}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedCategory === 'all' ? 'All Products' : getCategoryLabel(selectedCategory)} 
              <span className="text-gray-500 ml-2">({products.length})</span>
            </h2>
          </div>

          {products.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                {selectedCategory === 'all' 
                  ? 'No products have been added yet.' 
                  : `No products in ${getCategoryLabel(selectedCategory)} category.`
                }
              </p>
              <Link 
                href="/admin"
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
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
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
                    <tr key={`${product.category}-${product.id}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-16">
                            <img
                              className="h-12 w-16 object-cover rounded"
                              src={product.image}
                              alt={product.title}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 line-clamp-2">
                              {product.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.mileage}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getCategoryLabel(product.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.price}</div>
                        <div className="text-sm text-gray-500">{product.totalPrice}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.stockNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link
                            href={`/inventory/${product.category === 'stockCars' ? 'stock-cars' : 
                                   product.category === 'salvageVehicles' ? 'salvage' :
                                   product.category === 'constructionMachinery' ? 'machinery' : 'motorcycle'}/${product.id}`}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View Product"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </Link>
                          <button
                            className="text-yellow-600 hover:text-yellow-900 p-1"
                            title="Edit Product"
                            onClick={() => alert('Edit functionality coming soon!')}
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Product"
                            onClick={() => handleDelete(product.category, product.id)}
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
};

export default AdminDashboard; 