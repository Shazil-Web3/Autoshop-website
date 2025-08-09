import { Suspense } from 'react';
import ProductManagementClient from './ProductManagementClient';

export default function ProductManagementPage({ searchParams }) {
  const initialTab = typeof searchParams?.tab === 'string' ? searchParams.tab : undefined;
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-8"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="bg-white rounded-lg shadow-sm p-8 text-center">Loading...</div></div></div>}>
      <ProductManagementClient initialTab={initialTab} />
    </Suspense>
  );
} 