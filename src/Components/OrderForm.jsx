import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [apiStatus, setApiStatus] = useState('checking');

  // API base URL
  // const API_BASE_URL = 'http://localhost:5000/api';
  const API_BASE_URL=" https://testobackend-2.onrender.com/api";

  // Form state - UPDATED to match backend structure
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India'
    },
    products: [
      {
        name: 'Testro Booster Capsule',
        capsuleType: 'Regular', // Changed from Premium
        quantity: 1,
        price: 1499 // Changed from 1299
      }
    ],
    subtotal: 1499,
    tax: 120, // 8% of 1499
    shippingFee: 99,
    totalAmount: 1718,
    paymentMethod: 'cod',
    notes: '',
    orderStatus: 'pending', // Added to match backend
    paymentStatus: 'pending' // Added to match backend
  });

  // Check API status on component mount
  useEffect(() => {
    checkApiStatus();
  }, []);

  // Test API connection
  const checkApiStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      setApiStatus('connected');
      console.log('✅ API is connected');
    } catch (error) {
      try {
        // Try orders endpoint instead
        const response = await axios.get(`${API_BASE_URL}/orders/test-email`);
        setApiStatus('connected');
        console.log('✅ API is connected via test endpoint');
      } catch (err) {
        setApiStatus('disconnected');
        console.warn('⚠️ API connection failed:', err.message);
      }
    }
  };

  // Handle input changes - UPDATED
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('shippingAddress.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle product quantity change - UPDATED
  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value) || 1;
    let price = 1499; // Updated base price
    
    // Adjust price based on quantity (bulk discount)
    if (quantity >= 3) price = 1399; // ₹100 discount for 3+ bottles
    if (quantity >= 6) price = 1299; // ₹200 discount for 6+ bottles
    
    const subtotal = quantity * price;
    const tax = Math.round(subtotal * 0.08); // 8% tax
    const shippingFee = quantity >= 3 ? 0 : 99; // Free shipping for 3+ bottles
    const totalAmount = subtotal + tax + shippingFee;

    setFormData(prev => ({
      ...prev,
      products: [{
        ...prev.products[0],
        quantity: quantity,
        price: price
      }],
      subtotal: subtotal,
      tax: tax,
      shippingFee: shippingFee,
      totalAmount: totalAmount
    }));
  };

  // Handle capsule type change - UPDATED
  const handleCapsuleTypeChange = (e) => {
    const capsuleType = e.target.value;
    let price = 1499;
    let name = 'Testro Booster Capsule';
    
    // Different prices for different capsule types
    if (capsuleType === 'Premium') {
      price = 1799;
      name = 'Testro Booster Premium';
    } else if (capsuleType === 'Standard') {
      price = 1199;
      name = 'Testro Booster Standard';
    } else {
      name = 'Testro Booster Capsule';
    }
    
    const quantity = formData.products[0].quantity;
    const subtotal = quantity * price;
    const tax = Math.round(subtotal * 0.08);
    const shippingFee = quantity >= 3 ? 0 : 99;
    const totalAmount = subtotal + tax + shippingFee;

    setFormData(prev => ({
      ...prev,
      products: [{
        ...prev.products[0],
        capsuleType: capsuleType,
        price: price,
        name: name
      }],
      subtotal: subtotal,
      tax: tax,
      shippingFee: shippingFee,
      totalAmount: totalAmount
    }));
  };

  // Calculate savings - UPDATED
  const calculateSavings = () => {
    const basePrice = 1499;
    const currentPrice = formData.products[0].price;
    const quantity = formData.products[0].quantity;
    
    if (formData.products[0].capsuleType !== 'Regular') {
      return 0; // No savings calculation for other types
    }
    
    if (quantity >= 6) {
      return (basePrice - 1299) * quantity;
    } else if (quantity >= 3) {
      return (basePrice - 1399) * quantity;
    } else {
      return 0;
    }
  };

  // Format Indian Rupee
  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Handle form submission - UPDATED
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validate form data
    if (!formData.customerName.trim() || !formData.customerEmail.trim() || !formData.customerPhone.trim()) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }

    if (formData.customerPhone.length < 10) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    // Validate shipping address
    const { street, city, state, zipCode } = formData.shippingAddress;
    if (!street.trim() || !city.trim() || !state.trim() || !zipCode.trim()) {
      setError('Please fill all shipping address fields');
      setLoading(false);
      return;
    }

    try {
      // Prepare order data - UPDATED to match backend
      const orderData = {
        customerName: formData.customerName.trim(),
        customerEmail: formData.customerEmail.trim(),
        customerPhone: formData.customerPhone.trim(),
        shippingAddress: {
          street: street.trim(),
          city: city.trim(),
          state: state.trim(),
          zipCode: zipCode.trim(),
          country: formData.shippingAddress.country
        },
        products: formData.products,
        subtotal: formData.subtotal,
        tax: formData.tax,
        shippingFee: formData.shippingFee,
        totalAmount: formData.totalAmount,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes.trim(),
        orderStatus: 'pending',
        paymentStatus: 'pending'
      };

      console.log('📤 Submitting order:', orderData);

      // Make API call - UPDATED endpoint
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      });

      console.log('✅ API Response:', response.data);

      if (response.data.success) {
        setSuccess(true);
        setOrderNumber(response.data.order.orderNumber || response.data.order.orderNumber);
        
        // Reset form after success
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          shippingAddress: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'India'
          },
          products: [{
            name: 'Testro Booster Capsule',
            capsuleType: 'Regular',
            quantity: 1,
            price: 1499
          }],
          subtotal: 1499,
          tax: 120,
          shippingFee: 99,
          totalAmount: 1718,
          paymentMethod: 'cod',
          notes: '',
          orderStatus: 'pending',
          paymentStatus: 'pending'
        });

        // Auto redirect after 8 seconds
        setTimeout(() => {
          navigate('/', { 
            state: { 
              orderNumber: response.data.order.orderNumber,
              customerName: response.data.order.customerName,
              totalAmount: response.data.order.totalAmount 
            }
          });
        }, 8000);
      } else {
        setError(response.data.message || 'Order creation failed. Please try again.');
      }
    } catch (error) {
      console.error('❌ Order submission error:', error);
      
      // Enhanced error handling
      if (error.code === 'ECONNABORTED') {
        setError('Request timeout. Please check your internet connection.');
      } else if (error.response) {
        // Server responded with error
        const { data, status } = error.response;
        
        if (status === 400) {
          if (data.errors && Array.isArray(data.errors)) {
            const errorMessages = data.errors.join(', ');
            setError(`Validation Error: ${errorMessages}`);
          } else {
            setError(data.message || 'Invalid request data. Please check your inputs.');
          }
        } else if (status === 409) {
          setError('Duplicate order detected. Please try again with a different order number.');
        } else if (status === 500) {
          setError('Server error. Please try again later or contact support.');
        } else {
          setError(data.message || `Server error (${status}). Please try again.`);
        }
      } else if (error.request) {
        // Request made but no response
        setError('Network error. Please check: 1) Your internet connection 2) The server is running 3) No CORS issues');
      } else {
        // Other errors
        setError(error.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Test email endpoint
  const handleTestEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/orders/test-email`);
      if (response.data.success) {
        alert(`✅ Test email sent successfully!\nMessage ID: ${response.data.messageId}`);
      } else {
        alert(`❌ Failed to send test email: ${response.data.message}`);
      }
    } catch (error) {
      alert(`❌ Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle back to home
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* API Status Indicator */}
        {/* <div className={`mb-4 p-3 rounded-lg text-center text-sm font-medium ${
          apiStatus === 'connected' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
        }`}>
          {apiStatus === 'connected' ? (
            <div className="flex items-center justify-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              ✅ Connected to backend API
              <button 
                onClick={handleTestEmail}
                className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200"
              >
                Test Email
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
              ⚠️ Cannot connect to backend. Make sure server is running on port 5000.
            </div>
          )}
        </div> */}

        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={handleBackToHome}
            className="mb-4 inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Place Your Testro Booster Order
          </h1>
          <p className="text-gray-600">
            Fill in your details to order Testro Booster Capsules
          </p>
          <p className="text-sm text-green-600 mt-2">
            ✅ Orders placed will receive confirmation emails automatically
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg animate-pulse">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-10 w-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold text-green-800">🎉 Order Placed Successfully!</h3>
                <div className="mt-3 text-green-700 space-y-2">
                  <p>Your order number is: <strong className="text-2xl text-green-900">{orderNumber}</strong></p>
                  <p className="bg-green-100 p-2 rounded">A confirmation email has been sent to <strong>{formData.customerEmail}</strong></p>
                  <p className="text-sm">📧 Check your inbox (and spam folder) for order details</p>
                  <p className="text-sm mt-3 text-blue-600">
                    ⏳ You will be redirected to the thank you page in 8 seconds...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-red-800">Error Submitting Order</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p className="font-medium">{error}</p>
                  <p className="mt-2 text-xs">API Endpoint: POST {API_BASE_URL}/orders</p>
                  {apiStatus === 'disconnected' && (
                    <p className="mt-1 text-xs">
                      💡 Troubleshooting: 
                      1. Start backend server: <code>npm start</code> in backend folder
                      2. Check if server is running on <code>http://localhost:5000</code>
                      3. Verify no CORS errors in browser console
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Debug Info (remove in production) */}
        {/* {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-3 bg-gray-100 rounded text-xs">
            <details>
              <summary className="cursor-pointer font-medium">Debug Info</summary>
              <pre className="mt-2 text-xs overflow-auto">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </details>
          </div>
        )} */}

        {/* Order Form */}
        {!success && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              {/* Personal Information */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleInputChange}
                      required
                      minLength="2"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your@email.com"
                      disabled={loading}
                    />
                    <p className="text-xs text-gray-500 mt-1">Confirmation email will be sent here</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}"
                      title="10-digit phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="9876543210"
                      disabled={loading}
                    />
                    <p className="text-xs text-gray-500 mt-1">10-digit Indian number (no +91 needed)</p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="shippingAddress.street"
                      value={formData.shippingAddress.street}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="House number, street, area"
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="shippingAddress.city"
                      value={formData.shippingAddress.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your city"
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="shippingAddress.state"
                      value={formData.shippingAddress.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your state"
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="shippingAddress.zipCode"
                      value={formData.shippingAddress.zipCode}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{6}"
                      title="6-digit PIN code"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="123456"
                      disabled={loading}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country *
                    </label>
                    <select
                      name="shippingAddress.country"
                      value={formData.shippingAddress.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={loading}
                    >
                      <option value="India">India</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                  Order Details
                </h2>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <h3 className="font-medium text-gray-800">{formData.products[0].name}</h3>
                      <p className="text-sm text-gray-600 mt-1">Advanced male vitality supplement</p>
                      <p className="text-xs text-blue-600 mt-1">Order ID will be generated automatically</p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Capsule Type
                        </label>
                        <select
                          value={formData.products[0].capsuleType}
                          onChange={handleCapsuleTypeChange}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          disabled={loading}
                        >
                          <option value="Regular">Regular (₹1,499)</option>
                          <option value="Premium">Premium (₹1,799)</option>
                          <option value="Standard">Standard (₹1,199)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity
                        </label>
                        <select
                          value={formData.products[0].quantity}
                          onChange={handleQuantityChange}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          disabled={loading}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Bottle' : 'Bottles'}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Price per bottle</p>
                        <p className="text-lg font-semibold text-blue-600">
                          {formatINR(formData.products[0].price)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formData.products[0].capsuleType === 'Regular' && formData.products[0].quantity === 1 ? (
                            <span>Regular price</span>
                          ) : formData.products[0].capsuleType === 'Regular' && formData.products[0].quantity >= 3 ? (
                            <span className="text-green-600">Discounted price</span>
                          ) : null}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Discount Badge */}
                  {formData.products[0].capsuleType === 'Regular' && formData.products[0].quantity >= 3 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center">
                        <span className="text-yellow-600 mr-2">🎉</span>
                        <span className="text-yellow-800 font-medium">
                          {formData.products[0].quantity >= 6 ? 
                            `Great Deal! You save ${formatINR((1499 - 1299) * formData.products[0].quantity)}` : 
                            `Great Deal! You save ${formatINR((1499 - 1399) * formData.products[0].quantity)}`}
                        </span>
                        <span className="ml-2 text-sm text-yellow-600">
                          {formData.products[0].quantity >= 3 && '(Free shipping included)'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({formData.products[0].quantity} items)</span>
                      <span className="font-medium">{formatINR(formData.subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">GST (8%)</span>
                      <span className="font-medium">{formatINR(formData.tax)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping Fee</span>
                      <span className="font-medium">
                        {formData.shippingFee === 0 ? (
                          <span className="text-green-600 font-bold">FREE</span>
                        ) : (
                          formatINR(formData.shippingFee)
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between pt-4 border-t border-gray-300 mt-4">
                      <div>
                        <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                        <p className="text-xs text-gray-500">Payable via {formData.paymentMethod.toUpperCase()}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-blue-600">
                          {formatINR(formData.totalAmount)}
                        </span>
                        {formData.shippingFee === 0 && (
                          <p className="text-xs text-green-600 mt-1">Free shipping applied</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Savings Info */}
                  {formData.products[0].capsuleType === 'Regular' && formData.products[0].quantity >= 3 && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-green-800">
                          ✅ You saved {formatINR(calculateSavings())} with this order
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                  Payment Method
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['cod', 'upi', 'credit_card', 'bank_transfer'].map((method) => (
                    <div key={method} className="relative">
                      <input
                        type="radio"
                        id={method}
                        name="paymentMethod"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={handleInputChange}
                        className="sr-only"
                        disabled={loading}
                      />
                      <label
                        htmlFor={method}
                        className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.paymentMethod === method
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-300'
                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="text-lg">
                          {method === 'cod' ? '💰' : 
                           method === 'upi' ? '📱' : 
                           method === 'credit_card' ? '💳' : '🏦'}
                        </div>
                        <div className="text-sm font-medium mt-2 text-center">
                          {method === 'cod' ? 'Cash on Delivery' : 
                           method === 'upi' ? 'UPI Payment' : 
                           method === 'credit_card' ? 'Credit/Debit Card' : 'Bank Transfer'}
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b">
                  Additional Notes (Optional)
                </h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any special instructions for delivery, preferred delivery time, etc."
                  disabled={loading}
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-gray-600">
                    By placing your order, you agree to our{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800">Terms & Conditions</a>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    A confirmation email will be sent automatically
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={loading || apiStatus === 'disconnected'}
                  className={`px-8 py-4 rounded-lg font-semibold text-white transition-all ${
                    loading || apiStatus === 'disconnected'
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-red-700 to-yellow-600 hover:from-red-800 hover:to-yellow-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Processing Order...
                    </span>
                  ) : apiStatus === 'disconnected' ? (
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      Server Disconnected
                    </span>
                  ) : (
                    `Place Order - ${formatINR(formData.totalAmount)}`
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Support Info */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Need help? Contact us at support@testrobooster.com or call +91 98765 43210</p>
          <p className="mt-1">We'll send order confirmation and tracking details to your email</p>
          <p className="mt-2 text-green-600 font-medium">
            ✅ Free Shipping on orders of 3 or more bottles! | ✅ Automatic Email Confirmation
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Backend: {API_BASE_URL} | Status: {apiStatus === 'connected' ? '🟢 Connected' : '🔴 Disconnected'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;