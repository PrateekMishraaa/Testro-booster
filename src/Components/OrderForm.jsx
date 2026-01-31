import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [orderNumber, setOrderNumber] = useState('');

  // Form state
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
        capsuleType: 'Premium',
        quantity: 1,
        price: 1299
      }
    ],
    subtotal: 1299,
    tax: 104,
    shippingFee: 99,
    totalAmount: 1999,
    paymentMethod: 'cod',
    notes: ''
  });

  // API base URL
  const API_BASE_URL = 'https://testobackend-2.onrender.com/api';

  // Handle input changes
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

  // Handle product quantity change
  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value) || 1;
    let price = 1299;
    
    // Adjust price based on quantity (bulk discount)
    if (quantity >= 3) price = 1199; // ₹100 discount for 3+ bottles
    if (quantity >= 6) price = 1099; // ₹200 discount for 6+ bottles
    
    const subtotal = quantity * price;
    const tax = Math.round(subtotal * 0.08);
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

  // Handle capsule type change
  const handleCapsuleTypeChange = (e) => {
    const capsuleType = e.target.value;
    let price = 1299;
    
    // Different prices for different capsule types
    if (capsuleType === 'Ultra Premium') price = 1899;
    if (capsuleType === 'Standard') price = 999;
    
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
        price: price
      }],
      subtotal: subtotal,
      tax: tax,
      shippingFee: shippingFee,
      totalAmount: totalAmount
    }));
  };

  // Calculate savings
  const calculateSavings = () => {
    const basePrice = 1299;
    const currentPrice = formData.products[0].price;
    const quantity = formData.products[0].quantity;
    
    if (formData.products[0].capsuleType !== 'Premium') {
      return 0; // No savings for other types
    }
    
    if (quantity >= 6) {
      return (basePrice - 1099) * quantity;
    } else if (quantity >= 3) {
      return (basePrice - 1199) * quantity;
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Prepare order data
      const orderData = {
        ...formData,
        totalAmount: formData.subtotal + formData.tax + formData.shippingFee
      };

      console.log('Submitting order:', orderData);

      // Make API call
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log('API Response:', response.data);

      if (response.data.success) {
        setSuccess(true);
        setOrderNumber(response.data.order.orderNumber);
        
        // Reset form after 5 seconds and redirect
        setTimeout(() => {
          navigate('/');
        }, 5000);
      } else {
        setError(response.data.message || 'Order creation failed');
      }
    } catch (error) {
      console.error('Order submission error:', error);
      
      if (error.response) {
        // Server responded with error
        if (error.response.data.errors) {
          const errorMessages = error.response.data.errors.map(err => 
            `${err.field}: ${err.message}`
          ).join(', ');
          setError(`Validation Error: ${errorMessages}`);
        } else {
          setError(error.response.data.message || 'Server error occurred');
        }
      } else if (error.request) {
        // Request made but no response
        setError('Network error. Please check your connection and server.');
      } else {
        // Other errors
        setError(error.message || 'An error occurred');
      }
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
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-6 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-green-800">Order Placed Successfully!</h3>
                <div className="mt-2 text-green-700">
                  <p>Your order number is: <strong className="text-xl">{orderNumber}</strong></p>
                  <p className="mt-1">A confirmation email has been sent to {formData.customerEmail}</p>
                  <p className="mt-2 text-sm">You will be redirected to home page in 5 seconds...</p>
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
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
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
                    />
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 1234567890"
                    />
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="123456"
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
                      <h3 className="font-medium text-gray-800">Testro Booster Capsule</h3>
                      <p className="text-sm text-gray-600 mt-1">Advanced male vitality supplement</p>
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
                        >
                          <option value="Premium">Premium (₹1,299)</option>
                          <option value="Ultra Premium">Ultra Premium (₹1,899)</option>
                          <option value="Standard">Standard (₹999)</option>
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
                          {formData.products[0].capsuleType === 'Premium' && formData.products[0].quantity === 1 ? (
                            <span>Regular price</span>
                          ) : formData.products[0].capsuleType === 'Premium' && formData.products[0].quantity >= 3 ? (
                            <span className="text-green-600">Discounted price</span>
                          ) : null}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Discount Badge */}
                  {formData.products[0].capsuleType === 'Premium' && formData.products[0].quantity >= 3 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                      <div className="flex items-center">
                        <span className="text-yellow-600 mr-2">🎉</span>
                        <span className="text-yellow-800 font-medium">
                          {formData.products[0].quantity >= 6 ? 
                            `Great Deal! You save ${formatINR((1299 - 1099) * formData.products[0].quantity)}` : 
                            `Great Deal! You save ${formatINR((1299 - 1199) * formData.products[0].quantity)}`}
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
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatINR(formData.subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (8%)</span>
                      <span className="font-medium">{formatINR(formData.tax)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping Fee</span>
                      <span className="font-medium">
                        {formData.shippingFee === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          formatINR(formData.shippingFee)
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between pt-3 border-t border-gray-300">
                      <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {formatINR(formData.totalAmount)}
                      </span>
                    </div>
                  </div>

                  {/* Savings Info */}
                  {formData.products[0].capsuleType === 'Premium' && formData.products[0].quantity >= 3 && (
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
                  <div className="relative">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <label
                      htmlFor="cod"
                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-lg">💰</div>
                      <div className="text-sm font-medium mt-2 text-center">
                        Cash on Delivery
                      </div>
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="radio"
                      id="upi"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <label
                      htmlFor="upi"
                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.paymentMethod === 'upi'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-lg">📱</div>
                      <div className="text-sm font-medium mt-2 text-center">
                        UPI Payment
                      </div>
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="radio"
                      id="credit_card"
                      name="paymentMethod"
                      value="credit_card"
                      checked={formData.paymentMethod === 'credit_card'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <label
                      htmlFor="credit_card"
                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.paymentMethod === 'credit_card'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-lg">💳</div>
                      <div className="text-sm font-medium mt-2 text-center">
                        Credit/Debit Card
                      </div>
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="radio"
                      id="netbanking"
                      name="paymentMethod"
                      value="netbanking"
                      checked={formData.paymentMethod === 'netbanking'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <label
                      htmlFor="netbanking"
                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.paymentMethod === 'netbanking'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-lg">🏦</div>
                      <div className="text-sm font-medium mt-2 text-center">
                        Net Banking
                      </div>
                    </label>
                  </div>
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
                  placeholder="Any special instructions for delivery..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t">
                <div className="mb-4 md:mb-0">
                  <p className="text-sm text-gray-600">
                    By placing your order, you agree to our{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800">Terms & Conditions</a>
                  </p>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-8 py-4 rounded-lg font-semibold text-white transition-all ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-red-700 to-yellow-600 hover:from-red-800 hover:to-yellow-700 shadow-lg hover:shadow-xl'
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
          <p className="mt-1 text-green-600 font-medium">
            ✅ Free Shipping on orders of 3 or more bottles!
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;