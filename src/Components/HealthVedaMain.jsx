import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Veda from "../assets/testro.jpeg";
import Dawai from "../assets/dawai.jpeg";
import One from "../assets/11059.mp4";
import Two from "../assets/11061.jpg";
import Three from "../assets/11064.jpg";
import Four from "../assets/11067.mp4";
import Five from "../assets/11069.jpg";
import Six from "../assets/11072.jpg";
import Seven from "../assets/11074.mp4";
import Eight from "../assets/11076.mp4";
import Nine from "../assets/11078.jpg";
import Ten from "../assets/11081.mp4";

const HealthVedaMain = () => {
  const navigate = useNavigate();
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [ageVerified, setAgeVerified] = useState(false);
  const [under18, setUnder18] = useState(false);
  const [isPlaying, setIsPlaying] = useState({});
  
  // Timer state
  const [timer, setTimer] = useState({
    hours: 4,
    minutes: 23,
    seconds: 48
  });
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    // Check if age was already verified in session storage
    const verified = sessionStorage.getItem('ageVerified');
    if (verified === 'true') {
      setAgeVerified(true);
      setShowAgeVerification(false);
    }
  }, []);

  // Timer countdown effect
  useEffect(() => {
    if (!timerActive) return;

    const interval = setInterval(() => {
      setTimer(prevTimer => {
        let { hours, minutes, seconds } = prevTimer;
        
        seconds--;
        
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          
          if (minutes < 0) {
            minutes = 59;
            hours--;
            
            if (hours < 0) {
              // Timer reached 0, reset to 4 hours
              hours = 4;
              minutes = 23;
              seconds = 48;
              setTimerActive(false);
              setTimeout(() => setTimerActive(true), 1000);
            }
          }
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive]);

  const handleOrderClick = () => {
    navigate('/order-form');
  };

  const handleAgeVerification = (isOver18) => {
    if (isOver18) {
      setAgeVerified(true);
      setShowAgeVerification(false);
      sessionStorage.setItem('ageVerified', 'true');
    } else {
      setUnder18(true);
      setShowAgeVerification(false);
    }
  };

  const handleBackToVerification = () => {
    setUnder18(false);
    setShowAgeVerification(true);
  };

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  const toggleVideoPlay = (videoId) => {
    setIsPlaying(prev => ({
      ...prev,
      [videoId]: !prev[videoId]
    }));
  };

  // Data arrays
  const trustBadges = [
    { text: 'Premium Formula', icon: '✅' },
    { text: 'Fast Absorbing', icon: '⚡' },
    { text: 'Designed for Men', icon: '👨' }
  ];

  const problemPoints = [
    { icon: '❌', text: 'Thakaan & low stamina' },
    { icon: '❌', text: 'Lack of confidence' },
    { icon: '❌', text: 'Weak gym performance' },
    { icon: '❌', text: 'Stressful lifestyle effects' }
  ];

  const keyBenefits = [
    { icon: '⚡', title: 'Boosts stamina & daily energy' },
    { icon: '💪', title: 'Improves performance & drive' },
    { icon: '🔥', title: 'Supports muscle strength' },
    { icon: '👑', title: 'Enhances confidence' },
    { icon: '🔄', title: 'Better recovery & focus' },
    { icon: '🧬', title: 'Supports natural vitality' }
  ];

  const ingredients = [
    { name: 'Ashwagandha', benefit: 'Stress Support' },
    { name: 'Safed Musli', benefit: 'Energy Support' },
    { name: 'Kaunch Beej', benefit: 'Wellness Support' },
    { name: 'Gokshura', benefit: 'Strength Support' },
    { name: 'Zinc', benefit: 'Essential Mineral' },
    { name: 'Vitamin D3', benefit: 'Overall Health' }
  ];

  const workingSteps = [
    { step: '1', icon: '🧬', title: 'Absorbs fast in body', desc: 'Quick absorption for effective results' },
    { step: '2', icon: '⚡', title: 'Supports energy & strength', desc: 'Enhances physical performance' },
    { step: '3', icon: '🔥', title: 'Helps you feel confident', desc: 'Promotes overall wellbeing' }
  ];

  const userTypes = [
    'Gym & fitness enthusiasts',
    'Busy professionals',
    'Men feeling low energy',
    'Anyone wanting better performance'
  ];

  const testimonials = [
    {
      rating: 5,
      text: 'Energy aur stamina kaafi improve hui. Regular workouts mein fark mehsoos hota hai.',
      name: 'Rajesh Kumar',
      location: 'Delhi',
      image: '👤'
    },
    {
      rating: 5,
      text: 'Confidence pehle se strong feel hota hai. Office meetings mein better performance.',
      name: 'Vikram Singh',
      location: 'Mumbai',
      image: '👤'
    },
    {
      rating: 5,
      text: 'Gym performance noticeable better hui. Recovery time kam hua.',
      name: 'Arjun Patel',
      location: 'Bangalore',
      image: '👤'
    }
  ];

  const faqs = [
    {
      q: 'Kitne time me result dikhega?',
      a: 'Regular use se gradual results feel hote hain. Most users notice improvements within 2-4 weeks of consistent use.'
    },
    {
      q: 'Daily use safe hai?',
      a: 'Yes, recommended dosage ke saath safe hai. Hamara formula natural ingredients se bana hai.'
    },
    {
      q: 'Gym na karte ho tab bhi use kar sakte hain?',
      a: 'Haan, daily energy & confidence ke liye bhi effective hai. General wellness ke liye bhi use kar sakte hain.'
    },
    {
      q: 'Kya side effects hain?',
      a: 'Natural ingredients ke saath, side effects minimal hain. Phir bhi, doctor se consult karein agar koi medical condition ho.'
    }
  ];

  // Image and Video Gallery Data
  const mediaGallery = [
    { type: 'video', src: One, title: 'Before & After Transformation', desc: 'Real user results' },
    { type: 'image', src: Two, title: 'Premium Packaging', desc: 'Hygienic & Secure' },
    { type: 'image', src: Three, title: 'Natural Ingredients', desc: 'Pure & Potent' },
    { type: 'video', src: Four, title: 'How It Works', desc: 'Mechanism explained' },
    { type: 'image', src: Five, title: 'Capsule Close-up', desc: 'Easy to swallow' },
    { type: 'image', src: Six, title: 'Quality Assurance', desc: 'Lab tested' },
    { type: 'video', src: Seven, title: 'Customer Reviews', desc: 'Real testimonials' },
    { type: 'video', src: Eight, title: 'Manufacturing Process', desc: 'GMP certified' },
    { type: 'image', src: Nine, title: 'Results Timeline', desc: 'Expected progress' },
    { type: 'video', src: Ten, title: 'Final Results', desc: 'Complete transformation' }
  ];

  // Don't render main content if age not verified or under 18
  if (!ageVerified || under18) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
        {/* Age Verification Popup */}
        {showAgeVerification && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-red-700 to-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🔞</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Age Verification</h2>
                <p className="text-gray-300 mb-2">This website contains content for adults only.</p>
                <p className="text-gray-400 text-sm">You must be 18+ years old to access this content.</p>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={() => handleAgeVerification(true)}
                  className="w-full py-4 bg-gradient-to-r from-red-700 to-yellow-600 text-white font-bold rounded-lg hover:from-red-800 hover:to-yellow-700 transition-all transform hover:scale-[1.02]"
                >
                  ✅ I AM 18 YEARS OR OLDER
                </button>
                
                <button
                  onClick={() => handleAgeVerification(false)}
                  className="w-full py-4 bg-gray-700 text-gray-300 font-bold rounded-lg hover:bg-gray-600 transition-all"
                >
                  ❌ I AM UNDER 18 YEARS
                </button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-500 text-xs">
                  By entering this site, you are agreeing to our Terms & Conditions and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Under 18 Message */}
        {under18 && (
          <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-3xl">👶</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-3">Access Restricted</h2>
                <p className="text-gray-300 mb-4">
                  You must be 18 years or older to access this content.
                </p>
                <div className="bg-gray-800 p-4 rounded-lg mb-6">
                  <p className="text-gray-400 text-sm">
                    This website contains content intended for adults only. Please come back when you are of legal age.
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleBackToVerification}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all"
              >
                🔙 Go Back
              </button>
              
              <div className="mt-6 text-center">
                <p className="text-gray-500 text-xs">
                  Thank you for your honesty. We care about responsible content access.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main Content (only shown if age verified)
  return (
    <div className="min-h-screen bg-black">
      {/* Age Verified Indicator (small banner) */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white text-center py-2 text-sm">
        ✅ Age Verified | Welcome to Testro Booster
      </div>

      {/* 🔥 HERO SECTION */}
      <section className="relative bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
        {/* Gold accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-yellow-600/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-red-600/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <div className="text-white">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-700 to-yellow-600 rounded-full mb-6">
                <span className="font-bold text-sm">PREMIUM FORMULA</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  TESTRO BOOSTER
                </span>
              </h1>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Unleash Your Inner Power
              </h2>
              
              <p className="text-xl text-gray-300 mb-8">
                High-performance male vitality formula jo support karta hai:
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">💪</span>
                  <span className="text-gray-300">Strength</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⚡</span>
                  <span className="text-gray-300">Stamina</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🔥</span>
                  <span className="text-gray-300">Confidence</span>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleOrderClick}
                  className="px-8 py-4 bg-gradient-to-r from-red-700 to-yellow-600 text-white font-bold rounded-lg hover:from-red-800 hover:to-yellow-700 transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                >
                  🟥 BUY NOW
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all">
                  KNOW MORE
                </button>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 mt-8">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-xl">{badge.icon}</span>
                    <span className="text-gray-300">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Side - Product */}
            <div className="relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-yellow-600/30 rounded-full blur-3xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-3xl border border-gray-700 shadow-2xl">
                  <img 
                    src={Veda}
                    alt="Testro Booster Premium Bottle"
                    className="w-full h-auto transform hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop';
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎬 MEDIA GALLERY SECTION - Using One to Ten assets */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            See Testro Booster in Action
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Visual proof of quality, results, and transformation from real users
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mediaGallery.slice(0, 8).map((media, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div className="relative aspect-video">
                  {media.type === 'video' ? (
                    <>
                      <video
                        className="w-full h-full object-cover"
                        src={media.src}
                        muted
                        loop
                        autoPlay={isPlaying[`video-${index}`]}
                        poster={Two} // Using image 2 as poster
                        onClick={() => toggleVideoPlay(`video-${index}`)}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleVideoPlay(`video-${index}`)}
                          className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
                        >
                          <span className="text-white text-2xl">
                            {isPlaying[`video-${index}`] ? '⏸️' : '▶️'}
                          </span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <img
                      src={media.src}
                      alt={media.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80&ixid=${index}`;
                      }}
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold mb-1">{media.title}</h3>
                  <p className="text-gray-400 text-sm">{media.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Last two larger items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {mediaGallery.slice(8, 10).map((media, index) => (
              <div 
                key={index + 8}
                className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-300"
              >
                <div className="relative h-64 md:h-80">
                  {media.type === 'video' ? (
                    <>
                      <video
                        className="w-full h-full object-cover"
                        src={media.src}
                        muted
                        loop
                        autoPlay={isPlaying[`video-${index + 8}`]}
                        poster={Nine}
                        onClick={() => toggleVideoPlay(`video-${index + 8}`)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-white text-2xl font-bold mb-2">{media.title}</h3>
                        <p className="text-gray-300">{media.desc}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={media.src}
                        alt={media.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                        <h3 className="text-white text-2xl font-bold mb-2">{media.title}</h3>
                        <p className="text-gray-300">{media.desc}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⚠️ PROBLEM AWARENESS SECTION */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Feeling Low on Energy & Performance?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {problemPoints.map((point, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <div className="text-3xl mb-3">{point.icon}</div>
                  <p className="text-gray-300">{point.text}</p>
                </div>
              ))}
            </div>
            
            <p className="text-xl text-gray-400 italic">
              Modern lifestyle silently affects male performance.
            </p>
          </div>
        </div>
      </section>

      {/* 🔧 SOLUTION SECTION - Dawai Image Here */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              The Solution: <span className="text-yellow-400">TESTRO BOOSTER</span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Testro Booster specially banaya gaya hai un mardon ke liye jo apni natural masculine energy ko revive karna chahte hain. Advanced formula jo scientifically designed hai optimum results ke liye.
                </p>
                
                {/* Energy Meter */}
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Before</span>
                    <span className="text-yellow-400">After</span>
                  </div>
                  <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-600 via-yellow-500 to-yellow-400 w-3/4"></div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="text-center">
                      <div className="text-2xl">⚡</div>
                      <div className="text-sm text-gray-400">Low Energy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl">💪</div>
                      <div className="text-sm text-gray-400">Moderate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl">🔥</div>
                      <div className="text-sm text-yellow-400">Peak Performance</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Dawai Image Section */}
              <div className="relative">
                <div className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-2xl border border-gray-700">
                  <div className="flex flex-col items-center justify-center space-y-6 mb-6">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-red-700 to-yellow-600 p-1">
                      <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                        <img 
                          src={Dawai}
                          alt="Testro Booster Capsules"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = Five; // Use image 5 as fallback
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold">Premium Capsules</h3>
                      <p className="text-gray-400">Fast Absorption Formula</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {ingredients.slice(0, 3).map((ing, idx) => (
                      <div key={idx} className="text-center">
                        <div className="w-12 h-12 mx-auto mb-2 bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-xl">🌿</span>
                        </div>
                        <p className="text-sm text-gray-300">{ing.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 KEY BENEFITS SECTION */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            What Testro Booster Does for You
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyBenefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500 transition-all hover:transform hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {benefit.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌿 INGREDIENT SECTION with Multiple Images */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Advanced Male Vitality Formula
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left - Ingredients Grid with Images */}
              <div>
                <div className="mb-8">
                  <div className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl border border-gray-700">
                    <div className="flex flex-col items-center">
                      <div className="w-48 h-48 mb-4 rounded-lg overflow-hidden border-2 border-yellow-500 shadow-lg">
                        <img 
                          src={Two}
                          alt="Testro Booster Packaging"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = Five;
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Premium Packaging</h3>
                      <p className="text-gray-400">Hygienic & Protective</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {ingredients.map((ingredient, index) => (
                    <div 
                      key={index}
                      className="bg-gray-800 p-4 rounded-xl text-center border border-gray-700 hover:border-yellow-400 transition-all"
                    >
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-red-900 to-gray-800 flex items-center justify-center">
                        <span className="text-2xl">🌿</span>
                      </div>
                      <h4 className="font-bold text-white mb-1">
                        {ingredient.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {ingredient.benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right - Explanation with Image Grid */}
              <div>
                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 h-full">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Powerful Natural Support
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Powerful natural extracts jo body ke natural process ko support karte hain — bina harmful chemicals ke. Every ingredient is carefully selected for maximum effectiveness.
                  </p>
                  
                  {/* Small Image Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="rounded-lg overflow-hidden">
                      <img 
                        src={Three}
                        alt="Natural Ingredients"
                        className="w-full h-24 object-cover"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <img 
                        src={Six}
                        alt="Quality Lab"
                        className="w-full h-24 object-cover"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <img 
                        src={Nine}
                        alt="Results Timeline"
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-700 to-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-white">✔</span>
                      </div>
                      <span className="text-gray-300">Premium Quality Ingredients</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-700 to-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-white">✔</span>
                      </div>
                      <span className="text-gray-300">Safe & Effective Formula</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-700 to-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-white">✔</span>
                      </div>
                      <span className="text-gray-300">Easy to Consume Capsules</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔄 HOW IT WORKS with Video */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            How Testro Booster Works
          </h2>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {workingSteps.map((step, index) => (
                <div 
                  key={index}
                  className="relative bg-gray-900 p-8 rounded-xl border border-gray-800 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-700 to-yellow-600 rounded-full flex items-center justify-center text-3xl">
                    {step.icon}
                  </div>
                  <div className="text-4xl font-bold text-yellow-400 mb-2">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 mb-6">
                    {step.desc}
                  </p>
                  
                  {/* Video in Step 1 */}
                  {step.step === '1' && (
                    <div className="mt-4">
                      <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-yellow-500">
                        <video
                          className="w-full h-full object-cover"
                          src={Four}
                          muted
                          loop
                          autoPlay
                        />
                      </div>
                      <p className="text-gray-400 text-sm mt-2">Fast absorption demonstration</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Video Banner Below Steps */}
            <div className="mt-12 bg-gradient-to-r from-gray-800 to-black p-6 rounded-xl border border-gray-700">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h3 className="text-2xl font-bold text-white mb-3">Watch How It Works</h3>
                  <p className="text-gray-300">
                    See the complete mechanism of Testro Booster in action. Each capsule works systematically to deliver results.
                  </p>
                </div>
                <div className="w-64 h-48 rounded-lg overflow-hidden border-2 border-yellow-500 shadow-xl">
                  <video
                    className="w-full h-full object-cover"
                    src={Seven}
                    muted
                    loop
                    autoPlay
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 💊 HOW TO USE with Images */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              How to Use Testro Booster
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-4">💊</div>
                    <h3 className="text-lg font-bold text-white mb-2">Dosage</h3>
                    <p className="text-gray-300">1–2 capsules daily</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-4">🥛</div>
                    <h3 className="text-lg font-bold text-white mb-2">With</h3>
                    <p className="text-gray-300">Paani ya doodh ke saath</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-4">⏳</div>
                    <h3 className="text-lg font-bold text-white mb-2">Duration</h3>
                    <p className="text-gray-300">Regular use for best results</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-4">⚠️</div>
                    <h3 className="text-lg font-bold text-white mb-2">Note</h3>
                    <p className="text-gray-300">Healthy lifestyle recommended</p>
                  </div>
                </div>
              </div>
              
              {/* Image for Usage */}
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl border border-gray-700 w-full">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">Daily Routine Made Easy</h3>
                    <p className="text-gray-400">Simple to incorporate in your daily life</p>
                  </div>
                  <div className="w-full h-64 rounded-lg overflow-hidden border-2 border-yellow-500">
                    <img 
                      src={Five}
                      alt="Daily Usage Demonstration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 👥 WHO SHOULD USE */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
              Is Testro Booster Right for You?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {userTypes.map((type, index) => (
                <div 
                  key={index}
                  className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-400 transition-all"
                >
                  <div className="text-2xl mb-3 text-green-400">✔</div>
                  <p className="text-gray-300">{type}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-red-800 to-yellow-700 p-6 rounded-xl">
              <p className="text-2xl font-bold text-white">
                If you want to feel stronger, sharper & confident – this is for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ⭐ TESTIMONIALS with Transformation Videos */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            What Our Customers Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-yellow-500 transition-all"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-4 overflow-hidden">
                    {testimonial.image === '👤' ? (
                      <span className="text-xl">{testimonial.image}</span>
                    ) : (
                      <img 
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Transformation Video Section */}
          <div className="mt-12 bg-gradient-to-r from-gray-800 to-black p-8 rounded-xl border border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold text-white mb-3">Real Transformations</h3>
                <p className="text-gray-300 mb-4">
                  See actual results from our satisfied customers. These videos show the journey of transformation.
                </p>
                <button
                  onClick={handleOrderClick}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold rounded-lg hover:from-red-700 hover:to-yellow-600 transition-all"
                >
                  Start Your Transformation
                </button>
              </div>
              <div className="w-full md:w-96 h-64 rounded-lg overflow-hidden border-2 border-yellow-500 shadow-xl">
                <video
                  className="w-full h-full object-cover"
                  src={One}
                  muted
                  loop
                  autoPlay
                  poster={Two}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⏰ DYNAMIC COUNTDOWN TIMER SECTION */}
      <section className="py-12 bg-gradient-to-r from-red-900 via-black to-red-900">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-6 py-2 bg-yellow-500 text-black font-bold rounded-full mb-4 animate-pulse">
            ⏰ Limited Time Offer Ends In
          </div>
          
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Hurry! Special Price Ends Soon
            </h2>
            <p className="text-gray-300">Order within the next {timer.hours}h {timer.minutes}m {timer.seconds}s to get 50% OFF</p>
          </div>
          
          {/* Timer Display */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-black bg-opacity-50 p-6 rounded-xl border-2 border-yellow-500">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse">
                  {formatTime(timer.hours)}
                </div>
                <div className="text-gray-300">Hours</div>
              </div>
              
              <div className="bg-black bg-opacity-50 p-6 rounded-xl border-2 border-yellow-500">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse">
                  {formatTime(timer.minutes)}
                </div>
                <div className="text-gray-300">Minutes</div>
              </div>
              
              <div className="bg-black bg-opacity-50 p-6 rounded-xl border-2 border-yellow-500">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse">
                  {formatTime(timer.seconds)}
                </div>
                <div className="text-gray-300">Seconds</div>
              </div>
            </div>
            
            <div className="mt-6 w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-3 rounded-full transition-all duration-1000"
                style={{ 
                  width: `${((timer.hours * 3600 + timer.minutes * 60 + timer.seconds) / (4 * 3600 + 23 * 60 + 48)) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚨 LIMITED OFFER CTA */}
      <section className="py-16 bg-gradient-to-r from-red-900 via-black to-red-900">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-6 py-2 bg-yellow-500 text-black font-bold rounded-full mb-6 animate-pulse">
            🔥 Limited Stock Available!
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Get Testro Booster at Special Price Today
          </h2>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-black bg-opacity-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-white">🚚</div>
                <div className="text-white font-semibold">Fast Delivery</div>
              </div>
              <div className="bg-black bg-opacity-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-white">💯</div>
                <div className="text-white font-semibold">Quality Assured</div>
              </div>
            </div>
            
            {/* Timer in offer section */}
            <div className="bg-black bg-opacity-70 p-4 rounded-xl mb-6 border border-yellow-500">
              <div className="flex items-center justify-center space-x-4 mb-2">
                <span className="text-2xl text-yellow-400">⏰</span>
                <span className="text-white font-bold">Offer Ends In:</span>
                <span className="text-red-300 font-bold text-xl">
                  {formatTime(timer.hours)}:{formatTime(timer.minutes)}:{formatTime(timer.seconds)}
                </span>
              </div>
              <p className="text-gray-300 text-sm">Hurry! Only 12 units left in stock</p>
            </div>
          </div>

          <button
            onClick={handleOrderClick}
            className="px-12 py-6 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold text-2xl rounded-lg hover:from-red-700 hover:to-yellow-600 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 mb-6 animate-bounce"
          >
            🟥 ORDER NOW BEFORE TIMER ENDS
          </button>
          
          <p className="text-gray-300">
            Special discount ending soon. Limited stock available!
          </p>
        </div>
      </section>

      {/* ❓ FAQ SECTION */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition-all"
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-start">
                  <span className="text-yellow-400 mr-3">Q.</span>
                  {faq.q}
                </h3>
                <p className="text-gray-300 flex items-start">
                  <span className="text-green-400 mr-3">👉</span>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏁 FOOTER */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
                TESTRO BOOSTER
              </h3>
              <p className="text-gray-400">
                Premium male vitality support formula for modern lifestyle.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">About Us</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">Our Story</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">Mission</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">Quality Standards</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 +91 98765 43210</li>
                <li>✉️ support@testrobooster.com</li>
                <li>📍 Made in India</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">Shipping Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <div className="flex items-center justify-center mb-4 text-sm">
              <span className="bg-green-800 text-white px-3 py-1 rounded-full mr-2">🔞</span>
              <span className="text-gray-300">Age Verified Content | 18+ Only</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              ⚠️ Disclaimer: Testro Booster is a wellness supplement. These statements have not been evaluated by any medical authority. This product is not intended to diagnose, treat, cure, or prevent any disease. Results may vary. Consult your healthcare professional before use.
            </p>
            <p className="text-gray-500">
              © {new Date().getFullYear()} Testro Booster. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HealthVedaMain;