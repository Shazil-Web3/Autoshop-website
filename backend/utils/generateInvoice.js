const generateInvoice = (orderData) => {
  try {
    const invoice = {
      invoiceNumber: `INV-${Date.now()}`,
      date: new Date().toISOString(),
      customer: orderData.customer,
      items: orderData.items,
      total: orderData.total,
      status: 'pending'
    };
    
    return invoice;
  } catch (error) {
    console.error('Error generating invoice:', error);
    return null;
  }
};

module.exports = generateInvoice;