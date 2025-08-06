"use client";
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

const ConditionalLayout = ({ children }) => {
  const pathname = usePathname();
  
  // Pages where we don't want to show header and footer
  const hideHeaderFooterPages = [
    '/admin',
    '/dealer', 
    '/agent',
    '/create-invoice',
    '/my-invoices',
    '/submit-product-request',
    '/my-product-requests'
  ];
  
  // Check if current path starts with any of the hide pages
  const shouldHideHeaderFooter = hideHeaderFooterPages.some(page => 
    pathname.startsWith(page)
  );

  if (shouldHideHeaderFooter) {
    return (
      <main>
        {children}
      </main>
    );
  }

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default ConditionalLayout; 