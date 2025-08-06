"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import apiService from '../../../services/api';
import { 
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  PencilIcon,
  XMarkIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const ProductRequestsPage = () => {
  const router = useRouter();
  const [productRequests, setProductRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});

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
      const requests = await apiService.getAllProductRequests({ status: 'pending' });
      setProductRequests(requests.requests || []);
    } catch (error) {
      console.error('Error loading data:', error);
      setMessage('Error loading product requests');
    } finally {
      setIsLoading(false);
    }
  };

  // Product Request Handlers
  const handleViewRequest = async (requestId) => {
    try {
      const request = await apiService.getProductRequestById(requestId);
      setSelectedRequest(request);
      setShowRequestModal(true);
    } catch (error) {
      setMessage('Error loading request details');
    }
  };

  const handleApproveRequest = async (requestId, adminNotes = '') => {
    try {
      await apiService.approveProductRequest(requestId, adminNotes);
      setMessage('Product request approved successfully');
      setShowRequestModal(false);
      setSelectedRequest(null);
      loadData();
    } catch (error) {
      setMessage('Error approving product request');
    }
  };

  const handleRejectRequest = async (requestId, rejectionReason, adminNotes = '') => {
    try {
      await apiService.rejectProductRequest(requestId, rejectionReason, adminNotes);
      setMessage('Product request rejected successfully');
      setShowRequestModal(false);
      setSelectedRequest(null);
      loadData();
    } catch (error) {
      setMessage('Error rejecting product request');
    }
  };

  const handleEditRequest = (request) => {
    setSelectedRequest(request);
    setEditFormData(request.productData);
    setShowEditModal(true);
  };

  const handleEditAndApprove = async () => {
    try {
      await apiService.editAndApproveProductRequest(selectedRequest._id, editFormData, 'Edited and approved by admin');
      setMessage('Product request edited and approved successfully');
      setShowEditModal(false);
      setSelectedRequest(null);
      setEditFormData({});
      loadData();
    } catch (error) {
      setMessage('Error editing and approving product request');
    }
  };

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
                <h1 className="text-3xl font-bold text-gray-900">Product Requests</h1>
                <p className="text-gray-600 mt-2">Review and approve product submissions from dealers</p>
              </div>
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

        {/* Product Requests List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Pending Product Requests ({productRequests.length})
            </h2>
          </div>
          
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading product requests...</p>
            </div>
          ) : productRequests.length === 0 ? (
            <div className="p-8 text-center">
              <TruckIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pending product requests</h3>
              <p className="text-gray-600">All product requests have been processed.</p>
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
                      Requester
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {productRequests.map((request) => (
                    <tr key={request._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 line-clamp-2">
                            {request.productData.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.productData.description?.substring(0, 50)}...
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {request.requestType === 'vehicle' ? (
                            <TruckIcon className="w-4 h-4 text-blue-500 mr-2" />
                          ) : (
                            <WrenchScrewdriverIcon className="w-4 h-4 text-green-500 mr-2" />
                          )}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            request.requestType === 'vehicle' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {request.requestType}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {request.requesterName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {request.requesterRole}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${request.productData.price?.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(request.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(request.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleViewRequest(request._id)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View Details"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditRequest(request)}
                            className="text-yellow-600 hover:text-yellow-900 p-1"
                            title="Edit & Approve"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleApproveRequest(request._id)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Approve"
                          >
                            <CheckCircleIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              const reason = prompt('Enter rejection reason:');
                              if (reason) handleRejectRequest(request._id, reason);
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
      </div>

      {/* Request Detail Modal */}
      {showRequestModal && selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Product Request Details</h3>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Product Information</h4>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Title:</span> {selectedRequest.productData.title}</p>
                    <p><span className="font-medium">Type:</span> {selectedRequest.requestType}</p>
                    <p><span className="font-medium">Price:</span> ${selectedRequest.productData.price?.toLocaleString()}</p>
                    <p><span className="font-medium">Description:</span> {selectedRequest.productData.description}</p>
                    {selectedRequest.requestType === 'vehicle' && (
                      <>
                        <p><span className="font-medium">Make:</span> {selectedRequest.productData.make}</p>
                        <p><span className="font-medium">Model:</span> {selectedRequest.productData.model}</p>
                        <p><span className="font-medium">Year:</span> {selectedRequest.productData.year}</p>
                        <p><span className="font-medium">Mileage:</span> {selectedRequest.productData.mileage}</p>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Requester Information</h4>
                  <div className="mt-2 space-y-2">
                    <p><span className="font-medium">Name:</span> {selectedRequest.requesterName}</p>
                    <p><span className="font-medium">Role:</span> {selectedRequest.requesterRole}</p>
                    <p><span className="font-medium">Submitted:</span> {new Date(selectedRequest.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowRequestModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const reason = prompt('Enter rejection reason:');
                    if (reason) handleRejectRequest(selectedRequest._id, reason);
                  }}
                  className="px-4 py-2 text-red-600 border border-red-300 rounded-md hover:bg-red-50"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleApproveRequest(selectedRequest._id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Edit Product Request</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title || ''}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={editFormData.price || ''}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={editFormData.description || ''}
                    onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditAndApprove}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit & Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductRequestsPage; 