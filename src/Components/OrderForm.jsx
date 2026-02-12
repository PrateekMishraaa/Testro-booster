import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [orderNumber, setOrderNumber] = useState('');

  // API base URL
  const API_BASE_URL = "https://testobackend-2.onrender.com/api";

  // Simple form state - only essential fields
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    quantity: 1,
    paymentMethod: 'cod'
  });

  // Price calculation
  const pricePerBottle = 1499;
  const subtotal = formData.quantity * pricePerBottle;
  const shippingFee = formData.quantity >= 3 ? 0 : 99;
  const totalAmount = subtotal + shippingFee;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value) || 1;
    setFormData(prev => ({ ...prev, quantity }));
  };

  // Format Indian Rupee
  const formatINR = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    if (!formData.customerName || !formData.customerPhone || !formData.customerEmail || 
        !formData.address || !formData.city || !formData.state || !formData.pincode) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    if (formData.customerPhone.length < 10) {
      setError('Please enter valid 10-digit phone number');
      setLoading(false);
      return;
    }

    if (formData.pincode.length < 6) {
      setError('Please enter valid 6-digit PIN code');
      setLoading(false);
      return;
    }

    try {
      // Simple order data - matches backend structure
      const orderData = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.pincode,
          country: 'India'
        },
        products: [{
          name: 'Testro Booster',
          quantity: formData.quantity,
          price: pricePerBottle
        }],
        subtotal: subtotal,
        shippingFee: shippingFee,
        totalAmount: totalAmount,
        paymentMethod: formData.paymentMethod,
        orderStatus: 'pending',
        paymentStatus: 'pending'
      };

      const response = await axios.post(`${API_BASE_URL}/orders`, orderData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      });

      if (response.data.success) {
        setSuccess(true);
        setOrderNumber(response.data.order.orderNumber);
        
        // Reset form
        setFormData({
          customerName: '',
          customerPhone: '',
          customerEmail: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          quantity: 1,
          paymentMethod: 'cod'
        });

        // Redirect after 5 seconds
        setTimeout(() => navigate('/'), 5000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Back to home
  const handleBack = () => navigate('/');

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h2>
          <p className="text-lg font-semibold text-blue-600 mb-4">Order #: {orderNumber}</p>
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-gray-700">Confirmation sent to:</p>
            <p className="font-medium">{formData.customerEmail}</p>
          </div>
          <p className="text-sm text-gray-500 mb-6">Redirecting to home page in 5 seconds...</p>
          <button
            onClick={handleBack}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <button
            onClick={handleBack}
            className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center"
          >
            ← Back to Home
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Order Testro Booster
          </h1>
          <p className="text-gray-600">Fill the form below to place your order</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <span className="text-red-500 mr-3">⚠️</span>
            <span className="text-red-700 flex-1">{error}</span>
            <button onClick={() => setError(null)} className="text-red-500">✕</button>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            
            {/* Personal Info */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                1. Personal Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      required
                      placeholder="9876543210"
                      maxLength="10"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                2. Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="House no, street, landmark"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="City"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      placeholder="State"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                      placeholder="123456"
                      maxLength="6"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                3. Order Details
              </h2>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h3 className="font-medium text-gray-800">Testro Booster Capsule</h3>
                    <p className="text-sm text-gray-600">{formatINR(pricePerBottle)} per bottle</p>
                  </div>
                  
                  <div className="flex items-center mt-3 md:mt-0">
                    <label className="text-sm font-medium text-gray-700 mr-3">
                      Qty:
                    </label>
                    <select
                      value={formData.quantity}
                      onChange={handleQuantityChange}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Discount Message */}
                {formData.quantity >= 3 && (
                  <div className="mt-4 p-2 bg-green-50 border border-green-200 rounded-lg">
                    <span className="text-green-700 text-sm flex items-center">
                      🎉 Free shipping + bulk discount applied!
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method - Simplified */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
                4. Payment Method
              </h2>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === 'online'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span>Online Payment</span>
                </label>
              </div>
            </div>

            {/* Order Summary - Simple */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({formData.quantity} item{formData.quantity > 1 ? 's' : ''})</span>
                  <span className="font-medium">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 mt-3 border-t border-gray-300">
                  <span className="font-semibold text-gray-800">Total Amount</span>
                  <span className="text-xl font-bold text-blue-600">{formatINR(totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Processing...' : `Place Order • ${formatINR(totalAmount)}`}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              By placing your order, you agree to our Terms & Conditions
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;