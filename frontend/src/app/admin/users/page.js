import { Suspense } from 'react';
import UsersClient from './UsersClient';

export default function AdminUsersPage({ searchParams }) {
  const initialRole = typeof searchParams?.role === 'string' ? searchParams.role : undefined;
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 py-8"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="bg-white rounded-lg shadow-sm p-8 text-center">Loading...</div></div></div>}>
      <UsersClient initialRole={initialRole} />
    </Suspense>
  );
} 