"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiService from '../../services/api';
import { 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PencilIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const MyProductRequests = () => {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [filter, setFilter] = useState('all');

  // Check if user is authenticated and has permission
  useEffect(() => {
    const user = apiService.getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }
    
    if (!['dealer', 'agent'].includes(user.role)) {
      router.push('/');
      return;
    }
    
    if (user.status !== 'approved') {
      router.push('/');
      return;
    }

    loadRequests();
  }, [router]);

  const loadRequests = async () => {
    setIsLoading(true);
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await apiService.getMyProductRequests(params);
      setRequests(response.requests || []);
    } catch (error) {
      console.error('Error loading requests:', error);
      setMessage('Error loading your product requests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
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
        return <PencilIcon className="w-5 h-5 text-blue-500" />;
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

  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Product Requests</h1>
              <p className="text-gray-600 mt-2">Track the status of your submitted product requests</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/submit-product-request')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Submit New Request
              </button>
              <button
                onClick={() => router.back()}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Back
              </button>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2">
                <div className="bg-red-100 p-1 rounded-full">
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-red-800 font-medium">{message}</span>
              </div>
            </div>
          )}

          {/* Filter */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Filter by status:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="edited">Edited & Approved</option>
            </select>
            <button
              onClick={loadRequests}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Requests List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Product Requests ({filteredRequests.length})
            </h2>
          </div>
          
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading your requests...</p>
            </div>
          ) : filteredRequests.length === 0 ? (
            <div className="p-8 text-center">
              <ClockIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No product requests found</h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? "You haven't submitted any product requests yet."
                  : `No ${filter} requests found.`
                }
              </p>
              {filter === 'all' && (
                <button
                  onClick={() => router.push('/submit-product-request')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Submit Your First Request
                </button>
              )}
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
                      Status
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
                  {filteredRequests.map((request) => (
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
                        <div className="text-sm font-medium text-gray-900">
                          ${request.productData.price?.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getStatusIcon(request.status)}
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
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
                        <button
                          onClick={() => handleViewDetails(request)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="View Details"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedRequest && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Request Details</h3>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
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
                    {selectedRequest.productData.location && (
                      <p><span className="font-medium">Location:</span> {selectedRequest.productData.location}</p>
                    )}
                    {selectedRequest.requestType === 'vehicle' && (
                      <>
                        {selectedRequest.productData.make && <p><span className="font-medium">Make:</span> {selectedRequest.productData.make}</p>}
                        {selectedRequest.productData.model && <p><span className="font-medium">Model:</span> {selectedRequest.productData.model}</p>}
                        {selectedRequest.productData.year && <p><span className="font-medium">Year:</span> {selectedRequest.productData.year}</p>}
                        {selectedRequest.productData.mileage && <p><span className="font-medium">Mileage:</span> {selectedRequest.productData.mileage}</p>}
                      </>
                    )}
                    {selectedRequest.requestType === 'part' && (
                      <>
                        {selectedRequest.productData.category && <p><span className="font-medium">Category:</span> {selectedRequest.productData.category}</p>}
                        {selectedRequest.productData.brand && <p><span className="font-medium">Brand:</span> {selectedRequest.productData.brand}</p>}
                        {selectedRequest.productData.stock && <p><span className="font-medium">Stock:</span> {selectedRequest.productData.stock}</p>}
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Request Status</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      {getStatusIcon(selectedRequest.status)}
                      <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                        {selectedRequest.status}
                      </span>
                    </div>
                    <p><span className="font-medium">Submitted:</span> {new Date(selectedRequest.createdAt).toLocaleString()}</p>
                    {selectedRequest.reviewedAt && (
                      <p><span className="font-medium">Reviewed:</span> {new Date(selectedRequest.reviewedAt).toLocaleString()}</p>
                    )}
                    {selectedRequest.rejectionReason && (
                      <p><span className="font-medium">Rejection Reason:</span> {selectedRequest.rejectionReason}</p>
                    )}
                    {selectedRequest.adminNotes && (
                      <p><span className="font-medium">Admin Notes:</span> {selectedRequest.adminNotes}</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProductRequests; 