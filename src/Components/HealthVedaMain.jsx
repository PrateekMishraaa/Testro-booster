import React from 'react';
import { useNavigate } from 'react-router-dom';

const HealthVedaMain = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/order-form');
  };

  // Features data
  const features = [
    {
      icon: '⚡',
      title: 'Instant Energy Boost',
      description: 'Feel energized within minutes with our fast-acting formula'
    },
    {
      icon: '💪',
      title: 'Enhanced Stamina',
      description: 'Improve endurance and performance with natural ingredients'
    },
    {
      icon: '🧠',
      title: 'Mental Clarity',
      description: 'Sharpens focus and improves cognitive function'
    },
    {
      icon: '🛡️',
      title: 'Stress Relief',
      description: 'Reduces fatigue and promotes relaxation'
    }
  ];

  // Benefits data
  const benefits = [
    'Instant Energy Release',
    'Improved Physical Performance',
    'Enhanced Mental Focus',
    'Reduced Fatigue',
    'Better Stress Management',
    'Increased Productivity'
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Amit Sharma',
      age: 32,
      location: 'Bangalore',
      text: 'As a software engineer working long hours, Tetro Booster gives me the energy I need without crashes. Amazing product!',
      rating: 5
    },
    {
      name: 'Rohit Verma',
      age: 28,
      location: 'Delhi',
      text: 'Perfect for my gym sessions. I feel more energetic and can workout longer. Highly recommended!',
      rating: 5
    },
    {
      name: 'Neha Patel',
      age: 35,
      location: 'Mumbai',
      text: 'Helps me stay focused during my demanding job. Natural energy without side effects!',
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-purple-800 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/energy-background.jpg)',
            backgroundBlendMode: 'overlay'
          }}
        ></div>
        
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Unleash Your Energy Potential
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Experience revolutionary energy boost with Tetro Booster Capsules
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleOrderClick}
                className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl text-lg"
              >
                Order Now - Get 25% Off
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-700 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Tetro Booster Works?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Advanced formula designed for maximum energy and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-50 p-8 rounded-2xl shadow-lg">
                <div className="aspect-square bg-white rounded-xl shadow-2xl p-8 flex items-center justify-center">
                  <img 
                    src="/images/tetro-booster-bottle.jpg" 
                    alt="Tetro Booster Capsules"
                    className="max-w-full h-auto rounded-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop';
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Advanced Energy Formula
              </h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="ml-4 text-gray-700">
                    Contains <strong>Guarana, Ginseng, Maca Root, B-Vitamins</strong> and other energy-boosting compounds
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="ml-4 text-gray-700">
                    <strong>60 capsules per bottle</strong> - 1-2 month supply based on usage
                  </p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="ml-4 text-gray-700">
                    <strong>Quick absorption</strong> for immediate results, no jitters or crashes
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Benefits:</h3>
                <div className="flex flex-wrap gap-3">
                  {benefits.map((benefit, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">₹1,299</div>
                  <div className="text-sm text-gray-500">Per Bottle</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800 line-through">₹1,699</div>
                  <div className="text-sm text-green-600 font-semibold">Save ₹400</div>
                </div>
                <button
                  onClick={handleOrderClick}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Powerful Energy Ingredients
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Scientifically formulated with natural compounds for sustained energy
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { name: 'Guarana', benefit: 'Natural Caffeine' },
              { name: 'Ginseng', benefit: 'Stamina Boost' },
              { name: 'Maca Root', benefit: 'Endurance' },
              { name: 'B-Complex', benefit: 'Energy Metabolism' },
              { name: 'Rhodiola', benefit: 'Stress Adaptogen' },
              { name: 'L-Theanine', benefit: 'Focus & Calm' }
            ].map((ingredient, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all text-center"
              >
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl">⚡</span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">
                  {ingredient.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {ingredient.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
              How to Use for Maximum Results
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                  1️⃣
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Dosage
                </h3>
                <p className="text-gray-600">
                  Take <strong>1-2 capsules daily</strong> as needed for energy
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                  2️⃣
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Timing
                </h3>
                <p className="text-gray-600">
                  Best taken <strong>in the morning</strong> or before workouts
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                  3️⃣
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Duration
                </h3>
                <p className="text-gray-600">
                  Feel effects within <strong>30 minutes</strong>, lasts 6-8 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Trusted by Professionals
            </h2>
            <p className="text-gray-600">
              Real results from people who need sustained energy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {testimonial.name}, {testimonial.age}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i}
                      className={`text-xl ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-700 italic">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transform Your Energy Levels Today!
          </h2>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <div className="text-2xl font-bold">60+</div>
                <div className="text-sm">Capsules</div>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <div className="text-2xl font-bold">30 min</div>
                <div className="text-sm">Fast Acting</div>
              </div>
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <div className="text-2xl font-bold">30-Day</div>
                <div className="text-sm">Money Back Guarantee</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleOrderClick}
              className="px-8 py-4 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl text-lg"
            >
              Order Now & Get Free Shipping
            </button>
            <div className="text-center">
              <div className="text-sm opacity-90">Limited Time Offer</div>
              <div className="text-xl font-bold">25% OFF on First Order</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'Is Tetro Booster safe to use?',
                a: 'Yes, Tetro Booster is made with natural ingredients and is generally safe. However, consult your doctor if you have pre-existing medical conditions.'
              },
              {
                q: 'How quickly will I feel the effects?',
                a: 'Most users feel increased energy within 30-60 minutes of taking the capsules. Effects typically last 6-8 hours.'
              },
              {
                q: 'Are there any side effects?',
                a: 'Tetro Booster is formulated to minimize side effects. Some may experience mild effects if sensitive to caffeine. Start with one capsule to assess tolerance.'
              },
              {
                q: 'Can I take it daily?',
                a: 'Yes, Tetro Booster is safe for daily use. We recommend taking it in the morning or before physical activity.'
              },
              {
                q: 'Do you offer refunds?',
                a: 'Yes, we offer a 30-day money-back guarantee. If you are not satisfied with the results, you can return the product for a full refund.'
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {faq.q}
                </h3>
                <p className="text-gray-600">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Tetro Booster</h3>
              <p className="text-gray-400">
                Advanced energy and performance supplement. Natural, effective, and fast-acting.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 +91 98765 43210</li>
                <li>✉️ support@tetrobooster.com</li>
                <li>📍 Dehradun, Uttarakhand</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Certifications</h4>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-2xl">⚕️</span>
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-2xl">🔬</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Tetro Booster. All rights reserved.</p>
            <p className="mt-2 text-sm">Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HealthVedaMain;