"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiService from '../../services/api';
import { 
  PlusIcon,
  DocumentTextIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const MyInvoicesPage = () => {
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Check if user is agent
  useEffect(() => {
    const user = apiService.getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }
    
    if (user.role !== 'agent') {
      router.push('/');
      return;
    }
    
    if (user.status !== 'approved') {
      router.push('/');
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
      // Load invoices data
      // Note: You'll need to add these methods to your API service
      // const invoicesData = await apiService.getMyInvoices();
      // setInvoices(invoicesData.invoices || []);
      
      // For now, using placeholder data
      setInvoices([]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowModal(true);
  };

  const handleDeleteInvoice = async (invoiceId) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        // Add API call here when backend is ready
        // await apiService.deleteInvoice(invoiceId);
        
        // Remove from local state
        setInvoices(prev => prev.filter(inv => inv._id !== invoiceId));
      } catch (error) {
        console.error('Error deleting invoice:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Invoices</h1>
              <p className="text-gray-600 mt-2">View and manage your created invoices</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/create-invoice')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
              >
                <DocumentTextIcon className="w-4 h-4" />
                <span>Create New Invoice</span>
              </button>
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

        {/* Invoices List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">All Invoices ({invoices.length})</h2>
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
              <button
                onClick={() => router.push('/create-invoice')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-flex items-center space-x-2"
              >
                <DocumentTextIcon className="w-4 h-4" />
                <span>Create First Invoice</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Invoice #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {invoice.invoiceNumber}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {invoice.customerName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {invoice.customerEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {invoice.reference}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ${invoice.totalAmount?.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(invoice.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewInvoice(invoice)}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="View Invoice"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            className="text-yellow-600 hover:text-yellow-900 p-1"
                            title="Edit Invoice"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteInvoice(invoice._id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete Invoice"
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

        {/* Invoice Details Modal */}
        {showModal && selectedInvoice && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Invoice Details - {selectedInvoice.invoiceNumber}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Name:</span> {selectedInvoice.customerName}</p>
                      <p><span className="font-medium">ID:</span> {selectedInvoice.customerId}</p>
                      <p><span className="font-medium">Email:</span> {selectedInvoice.customerEmail}</p>
                      <p><span className="font-medium">Phone:</span> {selectedInvoice.customerPhone}</p>
                      <p><span className="font-medium">Address:</span> {selectedInvoice.customerAddress}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Shipping Information</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Consignee:</span> {selectedInvoice.consigneeName}</p>
                      <p><span className="font-medium">Country:</span> {selectedInvoice.country}</p>
                      <p><span className="font-medium">Port:</span> {selectedInvoice.port}</p>
                      <p><span className="font-medium">Container:</span> {selectedInvoice.container || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Product Details</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Reference:</span> {selectedInvoice.reference}</p>
                      <p><span className="font-medium">Stock:</span> {selectedInvoice.stock}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Pricing</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Vehicle Price:</span> ${selectedInvoice.vehiclePrice?.toLocaleString()}</p>
                      <p><span className="font-medium">Discount:</span> ${selectedInvoice.discount?.toLocaleString() || '0'}</p>
                      <p><span className="font-medium">Adjustment:</span> ${selectedInvoice.adjustment?.toLocaleString() || '0'}</p>
                      <p><span className="font-medium">Shipment Freight:</span> ${selectedInvoice.shipmentFreight?.toLocaleString() || '0'}</p>
                      <p className="font-bold text-lg"><span className="font-medium">Total:</span> ${selectedInvoice.totalAmount?.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Additional Services</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="font-medium">Container Inspection:</span> {selectedInvoice.inspection ? 'Yes' : 'No'}</p>
                    <p><span className="font-medium">Marine Insurance:</span> {selectedInvoice.marineInsurance ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInvoicesPage; 