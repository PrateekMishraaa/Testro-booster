import React, { useState, useEffect } from 'react';
import { BsWhatsapp } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import Veda from "../assets/testro.jpeg";
import Dawai from "../assets/dawai.jpeg";
import One from "../assets/11059.mp4";
import NewImgOne from "../assets/newimg.mp4";
import NewImgTwo from "../assets/newimg2.mp4";

import Three from "../assets/11064.jpg";
import Four from "../assets/11067.mp4";
import Five from "../assets/11069.jpg";
import Six from "../assets/11072.jpg";
import Seven from "../assets/11074.mp4";

import Nine from "../assets/11078.jpg";

import BabaRamdev from "../assets/baba.jpeg";

// Import comment section images
// import CommentImg1 from "../assets/comment1.jpg"; // Add this image to your assets
// import CommentImg2 from "../assets/comment2.jpg"; // Add this image to your assets
// import CommentImg3 from "../assets/comment3.jpg"; // Optional third image

const HealthVedaMain = () => {
  const navigate = useNavigate();
  const [showAgeVerification, setShowAgeVerification] = useState(true);
  const [ageVerified, setAgeVerified] = useState(false);
  const [under18, setUnder18] = useState(false);
  const [isPlaying, setIsPlaying] = useState({});
  const [showAllComments, setShowAllComments] = useState(false);
  
  // Timer state
  const [timer, setTimer] = useState({
    hours: 4,
    minutes: 23,
    seconds: 48
  });
  const [timerActive, setTimerActive] = useState(true);

  // Phone number for contact
  const phoneNumber = "9211608061";
  const whatsappMessage = "Hello, I'm interested in Testro Booster. Can you provide more information?";

  // WhatsApp and Call functions
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/91${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = `tel:+91${phoneNumber}`;
  };

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
    { text: 'AYUSH/FSASI Approved', icon: '✅' },
    { text: 'Made in India', icon: '🇮🇳' },
    { text: 'Natural Formula', icon: '🌿' }
  ];

  const problemPoints = [
    { icon: '❌', text: 'कमजोर मर्दानगी' },
    { icon: '❌', text: 'कम समय के संभोग' },
    { icon: '❌', text: 'आत्म-विश्वास की कमी' },
    { icon: '❌', text: 'यौन संतुष्टि न होना' }
  ];

  const keyBenefits = [
    { icon: '📏', title: 'लिंग का आकार 8-9 सेमी बढ़ाए' },
    { icon: '⏱️', title: 'संभोग अवधि 20 मिनट तक' },
    { icon: '💪', title: 'सख्त और स्थायी खड़ापन' },
    { icon: '🔥', title: 'लगातार पाँच बार संभोग' },
    { icon: '🧬', title: 'प्राकृतिक हॉर्मोन बढ़ाए' },
    { icon: '⚡', title: 'ऊर्जा और स्टैमिना बढ़ाए' }
  ];

  const ingredients = [
    { name: 'Ashwagandha', benefit: 'ताकत बढ़ाए' },
    { name: 'Safed Musli', benefit: 'ऊर्जा दें' },
    { name: 'Kaunch Beej', benefit: 'वीर्यवर्धक' },
    { name: 'Gokshura', benefit: 'शक्ति बढ़ाए' },
    { name: 'Shilajit', benefit: 'पुनर्योजी' },
    { name: 'Vitamin D3', benefit: 'समग्र स्वास्थ्य' }
  ];

  const workingSteps = [
    { step: '1', icon: '🧬', title: 'कैवर्नस प्रकोष में बढ़त', desc: '25 साल के बाद भी लिंग बढ़ता है' },
    { step: '2', icon: '⚡', title: 'रक्त धमनियाँ चौड़ी होती हैं', desc: 'बेहतर रक्त प्रवाह होता है' },
    { step: '3', icon: '🔥', title: 'सेक्स हॉर्मोन बढ़ते हैं', desc: 'प्राकृतिक मर्दानगी वापस आती है' }
  ];

  const testimonials = [
    {
      rating: 5,
      text: 'मेरा लिंग 15 से 18 सेमी का हो गया और अब सेक्स बोरिंग नहीं है। Testro Booster से मुझे वाकई में बहुत आश्चर्य हुआ है।',
      name: 'पार्थ',
      location: 'ग्राहक',
      image: '👤'
    },
    {
      rating: 5,
      text: 'केवल 12 दिनों में 8-9 सेमी बढ़ोतरी। संभोग की अवधि काफी बढ़ गई और स्थिरता मिली।',
      name: 'अजय कुमार',
      location: 'दिल्ली',
      image: '👤'
    },
    {
      rating: 5,
      text: '60 साल की उम्र में भी मर्दानगी वापस लाना संभव है। अब मैं कई घंटों तक संभोग कर सकता हूं।',
      name: 'अनुभवी ग्राहक',
      location: 'मुंबई',
      image: '👤'
    }
  ];

  // Comments data with images
  const comments = [
    {
      name: 'राजेश कुमार',
      location: 'दिल्ली',
      time: '2 घंटे पहले',
      text: 'मैंने 2 हफ्ते पहले ऑर्डर किया था। अब तक 7-8 सेमी का फर्क आ गया है। बहुत अच्छा प्रोडक्ट है 👍',
      likes: '2.3k',
      replies: '134',
      // image: CommentImg1,
      userImage: '👨'
    },
    {
      name: 'सुरेश पटेल',
      location: 'मुंबई',
      time: '5 घंटे पहले',
      text: 'वाकई में कमाल का रिजल्ट मिल रहा है। 15 दिनों में ही अंतर नजर आने लगा। सभी दोस्तों को सुझाऊंगा। 💯',
      likes: '1.8k',
      replies: '89',
      // image: CommentImg2,
      userImage: '👨‍🦱'
    },
    {
      name: 'अमित शर्मा',
      location: 'बैंगलोर',
      time: '8 घंटे पहले',
      text: 'बहुत संतुष्ट हूं। पहले महीने में ही 5 सेमी का फर्क आ गया। पत्नी भी खुश है 😊',
      likes: '3.1k',
      replies: '256',
      // image: CommentImg3, // Optional third image
      userImage: '👨'
    },
    {
      name: 'विक्रम सिंह',
      location: 'जयपुर',
      time: '1 दिन पहले',
      text: 'कोड ऑर्डर का ऑप्शन बहुत अच्छा है। घर पहुंचने पर पैसे दिए और प्रोडक्ट मिला। असर भी कमाल का है।',
      likes: '5.2k',
      replies: '423',
      userImage: '👴'
    },
    {
      name: 'दीपक वर्मा',
      location: 'लखनऊ',
      time: '1 दिन पहले',
      text: 'पहले वायाग्रा लेता था लेकिन सिरदर्द होता था। ये बिल्कुल सुरक्षित है और असर भी जबरदस्त।',
      likes: '4.7k',
      replies: '312',
      userImage: '👨'
    },
    {
      name: 'राहुल मिश्रा',
      location: 'पटना',
      time: '2 दिन पहले',
      text: 'कैश ऑन डिलीवरी का ऑप्शन होने से भरोसा हुआ। प्रोडक्ट ओरिजिनल है और असर भी जल्दी दिखा।',
      likes: '2.9k',
      replies: '178',
      userImage: '👨'
    }
  ];

  const faqs = [
    {
      q: 'कितने दिन में परिणाम दिखेगा?',
      a: 'केवल 12 दिनों में आप लिंग का आकार कम से कम 8-9 सेंटीमीटर तक बढ़ा सकते हैं और पहले परिणाम एक हफ्ते में ही नजर आने लगते हैं।'
    },
    {
      q: 'क्या यह वायाग्रा से बेहतर है?',
      a: 'हाँ, वायाग्रा सिर्फ रक्त पंप करती है जबकि Testro Booster प्राकृतिक सेक्स हॉर्मोन बढ़ाता है और स्थायी खड़ापन देता है।'
    },
    {
      q: 'क्या यह सुरक्षित है?',
      a: 'हाँ, यह स्वास्थ्य और परिवार कल्याण मंत्रालय द्वारा प्रमाणित है और AYUSH/FSASI एप्रूव्ड है।'
    },
    {
      q: 'क्या परिणाम स्थायी हैं?',
      a: 'हाँ, निर्देशों के अनुसार उपयोग से मिलने वाले नतीजे स्थायी रहते हैं।'
    }
  ];

  // Media Gallery Data
  const mediaGallery = [
    { type: 'image', src: Three, title: 'प्राकृतिक सामग्री', desc: 'शुद्ध और प्रभावी', id: 'image-3' },
    { type: 'image', src: Five, title: 'Testro Booster', desc: 'आसान निगलने योग्य', id: 'image-5' },
    { type: 'image', src: Six, title: 'उत्पाद छवि', desc: 'Testro Booster बॉटल', id: 'image-6' },
    { type: 'image', src: Nine, title: 'उत्पाद छवि', desc: 'विभिन्न कोण से', id: 'image-9' },
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
      {/* WhatsApp & Call Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/30 transition-all hover:scale-110"
          title="Chat on WhatsApp"
        >
          <BsWhatsapp className="text-white text-2xl" />
        </button>
        
        {/* Call Button */}
        <button
          onClick={handleCallClick}
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-blue-500/30 transition-all hover:scale-110"
          title="Call Now"
        >
          <span className="text-3xl">📞</span>
        </button>
      </div>

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
              {/* Government of India Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-700 to-yellow-600 rounded-full mb-6">
                <span className="font-bold text-sm">स्वास्थ्य और परिवार कल्याण मंत्रालय प्रमाणित</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  TESTRO BOOSTER
                </span>
              </h1>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                लिंग का आकार बढ़ाने और संभोग की अवधि बढ़ाने का वैज्ञानिक तरीका
              </h2>
              
              <div className="bg-red-900/30 border-l-4 border-yellow-500 p-4 mb-6 rounded-r-lg">
                <p className="text-xl text-white font-bold">
                  आप 12 दिनों में, लिंग का आकार कम से कम 8-9 सेंटीमीटर तक बढ़ा सकते हैं और लगातार पाँच बार संभोग कर सकते हैं
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">📏</span>
                  <span className="text-gray-300">लंबा और मोटा लिंग</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⏱️</span>
                  <span className="text-gray-300">20+ मिनट संभोग</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">💪</span>
                  <span className="text-gray-300">सख्त खड़ापन</span>
                </div>
              </div>
              
              {/* Price Section */}
              <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-gray-400 line-through">पुरानी कीमत: ₹5000</p>
                    <p className="text-3xl font-bold text-yellow-400">नई कीमत: ₹1485</p>
                    <p className="text-green-400 font-bold">70% छूट</p>
                  </div>
                  <div className="bg-red-700 px-3 py-1 rounded-full">
                    <p className="text-white text-sm font-bold">सीमित समय ऑफर</p>
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleOrderClick}
                  className="px-8 py-4 bg-gradient-to-r from-red-700 to-yellow-600 text-white font-bold rounded-lg hover:from-red-800 hover:to-yellow-700 transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1 text-lg"
                >
                  🟥 अभी ऑर्डर करें
                </button>
                <button 
                  onClick={handleWhatsAppClick}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black transition-all"
                >
                  📞 मुफ्त परामर्श
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
                  <div className="text-center mt-4">
                    <p className="text-yellow-400 font-bold">FREE SHIPPING ON PREPAID</p>
                    <p className="text-gray-300">अभी ऑर्डर करें और मुफ्त शिपिंग पाएं</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎬 MEDIA GALLERY SECTION */}
     

      {/* ⚠️ PROBLEM AWARENESS SECTION */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              क्या आप इन समस्याओं से परेशान हैं?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {problemPoints.map((point, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-red-500 transition-all">
                  <div className="text-3xl mb-3">{point.icon}</div>
                  <p className="text-gray-300 text-lg">{point.text}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-red-900/30 p-6 rounded-xl border border-red-700 mb-8">
              <p className="text-xl text-white italic">
                "मैं भी इसी बात को लेकर कई साल से परेशान था कि मुझे सेक्स में मजा नहीं आता था। यह इतना बिगड़ गया कि मैं अपनी बीवी से महीने में एक बार ही सेक्स करता था..."
              </p>
            </div>
            
            <p className="text-xl text-gray-400">
              याद रखे कि सेक्स और बिस्तर में संतुष्टि एक औरत के लिए बहुत अहम चीजें होती हैं, खासकर जवान औरतों के लिए।
            </p>
          </div>
        </div>
      </section>

      {/* 🔧 SOLUTION SECTION */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              समाधान: <span className="text-yellow-400">TESTRO BOOSTER</span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg mb-6">
                  <h3 className="text-2xl font-bold text-white mb-3">वैज्ञानिक कार्यप्रणाली</h3>
                  <p className="text-gray-300">
                    पुरुष शरीर में कैवर्नस प्रकोष की बढ़त 25 साल की उम्र तक पूरी हो जाती है। जब Testro Booster उपयोग किया जाता है तो यह प्रक्रिया फिर से चालू हो जाती है और रक्त धमनियाँ चौड़ी होने लगती हैं।
                  </p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-700 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white">✓</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">वायाग्रा से बेहतर</h4>
                      <p className="text-gray-300">
                        वायाग्रा जैसी सभी आर्टिफिशियल दवाएं बस लिंग में रक्त "पंप" कर देती है जिससे हृदय पर बहुत लोड पड़ता है। वहीं Testro Booster पुरुष सेक्स हॉर्मोन बढ़ाना उत्प्रेरित करता है।
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-700 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white">✓</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">स्थायी परिणाम</h4>
                      <p className="text-gray-300">
                        Testro Booster के निर्देशों के अनुसार उपयोग से मिलने वाले नतीजे स्थायी रहते हैं। इसका असर निजी गुण-धर्मों पर निर्भर करता है लेकिन पहले नतीजे एक हफ्ते में ही नजर आने लगते हैं।
                      </p>
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
                            e.target.src = Five;
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold">प्रीमियम कैप्सूल</h3>
                      <p className="text-gray-400">तेज अवशोषण फॉर्मूला</p>
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
                
                {/* Guarantee Badge */}
                <div className="mt-6 bg-blue-900/30 p-4 rounded-lg border border-blue-700">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">✅</span>
                    <div>
                      <p className="text-white font-bold">GUARANTEED SAFE CHECKOUT</p>
                      <p className="text-gray-300 text-sm">VISA • Mastercard • NET Banking • PhonePe</p>
                    </div>
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
            Testro Booster के लाभ
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
                <p className="text-gray-400">
                  {index === 0 && "12 दिनों में दिखने लगते हैं परिणाम"}
                  {index === 1 && "संभोग की अवधि कम से कम 20 मिनट तक बढ़ जाएगी"}
                  {index === 2 && "एक मर्द को नियमित, सख्त और स्थायी खड़ापन मिलता है"}
                  {index === 3 && "आपकी महिला स्थिति को लगातार पाँच बार कमोन्माद आ पाएगा"}
                  {index === 4 && "मर्द के शरीर में सेक्स हॉर्मोन ज्यादा बनने से आर्थिक ध्यान का लाभ है"}
                  {index === 5 && "थकान नहीं होती, जवानी का एहसास आ जाता है"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌿 INGREDIENT SECTION */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              उन्नत पुरुष शक्ति फॉर्मूला
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left - Ingredients Grid */}
              <div>
                <div className="mb-8">
                  <div className="bg-gradient-to-br from-gray-800 to-black p-6 rounded-xl border border-gray-700">
                    <div className="flex flex-col items-center">
                      <div className="w-48 h-48 mb-4 rounded-lg overflow-hidden border-2 border-yellow-500 shadow-lg">
                        <img 
                          src={Three}
                          alt="Testro Booster Natural Ingredients"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = Five;
                          }}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">प्राकृतिक सामग्री</h3>
                      <p className="text-gray-400">शुद्ध आयुर्वेदिक तत्व</p>
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
              
              {/* Right - Explanation */}
              <div>
                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 h-full">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    शक्तिशाली प्राकृतिक समर्थन
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    शक्तिशाली प्राकृतिक अर्क जो शरीर की प्राकृतिक प्रक्रियाओं का समर्थन करते हैं — बिना हानिकारक रसायनों के। हर सामग्री को अधिकतम प्रभावशीलता के लिए सावधानीपूर्वक चुना गया है।
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-700 to-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-white">✔</span>
                      </div>
                      <span className="text-gray-300">प्रीमियम गुणवत्ता वाली सामग्री</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-700 to-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-white">✔</span>
                      </div>
                      <span className="text-gray-300">सुरक्षित और प्रभावी फॉर्मूला</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-700 to-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-white">✔</span>
                      </div>
                      <span className="text-gray-300">आसान सेवन योग्य कैप्सूल</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-red-700 to-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-white">✔</span>
                      </div>
                      <span className="text-gray-300">60 साल की उम्र में भी प्रभावी</span>
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
            Testro Booster कैसे काम करता है
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
                  
                  {/* Video in Step 1 - New Video */}
                  {step.step === '1' && (
                    <div className="mt-4">
                      <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-yellow-500">
                        <video
                          className="w-full h-full object-cover"
                          src={NewImgOne}
                          muted
                          loop
                          autoPlay
                        />
                      </div>
                      <p className="text-gray-400 text-sm mt-2">शुरुआती परिणाम - 7 दिनों में</p>
                    </div>
                  )}
                  
                  {/* Video in Step 2 - New Video */}
                  {step.step === '2' && (
                    <div className="mt-4">
                      <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-yellow-500">
                        <video
                          className="w-full h-full object-cover"
                          src={NewImgTwo}
                          muted
                          loop
                          autoPlay
                        />
                      </div>
                      <p className="text-gray-400 text-sm mt-2">रक्त धमनियाँ चौड़ी होती हैं</p>
                    </div>
                  )}
                  
                  {/* Video in Step 3 */}
                  {step.step === '3' && (
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
                      <p className="text-gray-400 text-sm mt-2">फास्ट अब्जॉर्प्शन डेमो</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Video Banner Below Steps */}
            <div className="mt-12 bg-gradient-to-r from-gray-800 to-black p-8 rounded-xl border border-gray-700">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h3 className="text-2xl font-bold text-white mb-3">वैज्ञानिक तरीके से काम करता है</h3>
                  <p className="text-gray-300 mb-4">
                    कैवर्नस प्रकोष में रक्त भरने लगता है और लिंग ज्यादा बड़ा होने लगता है। यह प्रक्रिया फिर से चालू हो जाती है और रक्त धमनियाँ चौड़ी होने लगती हैं।
                  </p>
                  <button
                    onClick={handleOrderClick}
                    className="px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold rounded-lg hover:from-red-700 hover:to-yellow-600 transition-all"
                  >
                    अपना परिवर्तन शुरू करें
                  </button>
                </div>
                <div className="w-full md:w-96 h-64 rounded-lg overflow-hidden border-2 border-yellow-500 shadow-xl">
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

      {/* ⭐ TESTIMONIALS */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            हमारे ग्राहक क्या कहते हैं
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
                    <span className="text-xl">{testimonial.image}</span>
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
                <h3 className="text-2xl font-bold text-white mb-3">रियल ट्रांसफॉर्मेशन</h3>
                <p className="text-gray-300 mb-4">
                  हमारे संतुष्ट ग्राहकों के वास्तविक परिणाम देखें। ये वीडियो परिवर्तन की यात्रा दिखाते हैं।
                </p>
                <button
                  onClick={handleOrderClick}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold rounded-lg hover:from-red-700 hover:to-yellow-600 transition-all"
                >
                  अपना परिवर्तन शुरू करें
                </button>
              </div>
              <div className="w-full md:w-96 h-64 rounded-lg overflow-hidden border-2 border-yellow-500 shadow-xl">
                <video
                  className="w-full h-full object-cover"
                  src={One}
                  muted
                  loop
                  autoPlay
                  poster={Three}
                />
              </div>
            </div>
          </div>
          
          {/* Baba Ramdev Section WITH PHOTO */}
          <div className="mt-12 bg-gradient-to-r from-orange-900/30 to-yellow-900/30 p-8 rounded-xl border border-yellow-700">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl font-bold text-white mb-3">बाबा रामदेव की सिफारिश</h3>
                <p className="text-gray-300 mb-4">
                  "मेरा नाम बाबा रामदेव है, और मैं आपके सामने लाया हूँ लिंग का आकार बढ़ाने और संभोग की अवधि बढ़ाने का वैज्ञानिक तरीका।"
                </p>
                <div className="bg-yellow-900/50 p-4 rounded-lg">
                  <p className="text-white font-bold">इस उपाय के कई स्पष्ट प्रभाव हैं:</p>
                  <ul className="text-gray-300 mt-2 space-y-1">
                    <li>• आपका लिंग लंबा और मोटा हो जाएगा</li>
                    <li>• संभोग की अवधि कम से कम 20 मिनट तक बढ़ जाएगी</li>
                    <li>• आपका यौन जीवन बेहतर हो जाएगा</li>
                  </ul>
                </div>
              </div>
              <div className="relative w-64 h-64 rounded-lg overflow-hidden border-4 border-yellow-500 shadow-xl">
                <img 
                  src={BabaRamdev}
                  alt="Baba Ramdev"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-center">
                  <p className="text-white font-bold">बाबा रामदेव</p>
                  <p className="text-yellow-300 text-sm">योग गुरु और आयुर्वेद विशेषज्ञ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 💬 COMMENTS SECTION WITH IMAGES */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
              ग्राहक समीक्षा और टिप्पणियाँ
            </h2>
            <p className="text-gray-400 text-center mb-12">
              हमारे संतुष्ट ग्राहकों के वास्तविक अनुभव
            </p>

            {/* Comments Feed */}
            <div className="space-y-6 mb-8">
              {(showAllComments ? comments : comments.slice(0, 3)).map((comment, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all">
                  {/* Comment Header */}
                  <div className="flex items-start space-x-4">
                    {/* User Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-700 to-yellow-600 flex items-center justify-center text-2xl flex-shrink-0">
                      {comment.userImage}
                    </div>
                    
                    <div className="flex-1">
                      {/* User Info */}
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <h4 className="font-bold text-white">{comment.name}</h4>
                        <span className="text-gray-500 text-sm">•</span>
                        <span className="text-gray-400 text-sm">{comment.location}</span>
                        <span className="text-gray-500 text-sm">•</span>
                        <span className="text-gray-400 text-sm">{comment.time}</span>
                      </div>
                      
                      {/* Comment Text */}
                      <p className="text-gray-300 mb-3">{comment.text}</p>
                      
                      {/* Comment Images */}
                      {comment.image && (
                        <div className="mb-3">
                          <img 
                            src={comment.image}
                            alt={`Comment by ${comment.name}`}
                            className="w-48 h-32 object-cover rounded-lg border border-gray-600 hover:border-yellow-500 transition-all"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      
                      {/* Comment Actions */}
                      <div className="flex items-center space-x-6 text-sm">
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition">
                          <span>👍</span>
                          <span>{comment.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition">
                          <span>💬</span>
                          <span>{comment.replies}</span>
                        </button>
                        <button className="text-gray-400 hover:text-yellow-400 transition">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View More Comments Button */}
            {comments.length > 3 && (
              <div className="text-center">
                <button
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all inline-flex items-center space-x-2"
                >
                  <span>{showAllComments ? 'कम दिखाएं' : 'और टिप्पणियाँ देखें'}</span>
                  <span>{showAllComments ? '↑' : '↓'}</span>
                </button>
              </div>
            )}

            {/* Write a Comment Box */}
            <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">अपनी टिप्पणी लिखें</h3>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-700 to-yellow-600 flex items-center justify-center text-xl flex-shrink-0">
                  👤
                </div>
                <div className="flex-1">
                  <textarea 
                    placeholder="अपना अनुभव साझा करें..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 resize-none"
                    rows="3"
                  ></textarea>
                  <div className="mt-3 flex justify-end">
                    <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-semibold rounded-lg hover:from-red-700 hover:to-yellow-600 transition-all">
                      टिप्पणी करें
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ⏰ DYNAMIC COUNTDOWN TIMER SECTION WITH CASH ON DELIVERY HEADING */}
      <section className="py-12 bg-gradient-to-r from-red-900 via-black to-red-900">
        <div className="container mx-auto px-4 text-center">
          {/* Cash on Delivery Heading */}
          <div className="mb-8 inline-block">
            <div className="flex items-center space-x-3 bg-green-600 text-white px-8 py-4 rounded-full animate-pulse shadow-2xl">
              <span className="text-3xl">💵</span>
              <h3 className="text-3xl md:text-4xl font-extrabold">कैश ऑन डिलीवरी उपलब्ध</h3>
              <span className="text-3xl">🚚</span>
            </div>
            <p className="text-green-400 mt-2 text-lg">घर पहुंचने पर भुगतान करें</p>
          </div>
          
          <div className="inline-block px-6 py-2 bg-yellow-500 text-black font-bold rounded-full mb-4 animate-pulse">
            ⏰ सीमित समय ऑफर समाप्त हो रहा है
          </div>
          
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              जल्दी करें! विशेष मूल्य जल्द समाप्त
            </h2>
            <p className="text-gray-300">अगले {timer.hours}h {timer.minutes}m {timer.seconds}s के भीतर ऑर्डर करें और 70% छूट पाएं</p>
          </div>
          
          {/* Timer Display */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-black bg-opacity-50 p-6 rounded-xl border-2 border-yellow-500">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse">
                  {formatTime(timer.hours)}
                </div>
                <div className="text-gray-300">घंटे</div>
              </div>
              
              <div className="bg-black bg-opacity-50 p-6 rounded-xl border-2 border-yellow-500">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse">
                  {formatTime(timer.minutes)}
                </div>
                <div className="text-gray-300">मिनट</div>
              </div>
              
              <div className="bg-black bg-opacity-50 p-6 rounded-xl border-2 border-yellow-500">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-pulse">
                  {formatTime(timer.seconds)}
                </div>
                <div className="text-gray-300">सेकंड</div>
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
            
            {/* Stock Counter */}
            <div className="mt-6 bg-red-900/30 p-4 rounded-lg border border-red-700">
              <div className="flex items-center justify-center space-x-4">
                <span className="text-2xl text-yellow-400">📦</span>
                <div>
                  <p className="text-white font-bold">सीमित स्टॉक उपलब्ध</p>
                  <p className="text-gray-300">केवल 17 पैकेट बचे हैं</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚨 LIMITED OFFER CTA */}
      <section className="py-16 bg-gradient-to-r from-red-900 via-black to-red-900">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block px-6 py-2 bg-yellow-500 text-black font-bold rounded-full mb-6 animate-pulse">
            🔥 आज ही ऑर्डर करें!
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            आज ही Testro Booster विशेष मूल्य पर पाएं
          </h2>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-black bg-opacity-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-white">🚚</div>
                <div className="text-white font-semibold">मुफ्त शिपिंग</div>
                <div className="text-gray-300 text-sm">प्रीपेड ऑर्डर पर</div>
              </div>
              <div className="bg-black bg-opacity-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-white">💯</div>
                <div className="text-white font-semibold">गुणवत्ता आश्वासन</div>
                <div className="text-gray-300 text-sm">AYUSH/FSASI एप्रूव्ड</div>
              </div>
            </div>
            
            {/* Price Comparison */}
            <div className="bg-black bg-opacity-70 p-6 rounded-xl mb-6 border border-yellow-500">
              <div className="flex justify-between items-center mb-4">
                <div className="text-left">
                  <p className="text-gray-400">पुरानी कीमत</p>
                  <p className="text-2xl line-through text-gray-300">₹5000</p>
                </div>
                <div className="text-center">
                  <p className="text-green-400 font-bold">70% छूट</p>
                  <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500 w-3/4"></div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">नई कीमत</p>
                  <p className="text-3xl font-bold text-yellow-400">₹1485</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-4 mb-2">
                <span className="text-2xl text-yellow-400">⏰</span>
                <span className="text-white font-bold">ऑफर समाप्ति:</span>
                <span className="text-red-300 font-bold text-xl">
                  {formatTime(timer.hours)}:{formatTime(timer.minutes)}:{formatTime(timer.seconds)}
                </span>
              </div>
              <p className="text-gray-300 text-sm">जल्दी करें! स्टॉक समाप्त हो रहा है</p>
            </div>
          </div>

          <button
            onClick={handleOrderClick}
            className="px-12 py-6 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold text-2xl rounded-lg hover:from-red-700 hover:to-yellow-600 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 mb-6 animate-bounce"
          >
            🟥 अभी ऑर्डर करें - ₹1485 में
          </button>
          
          <p className="text-gray-300">
            स्पेशल डिस्काउंट जल्द समाप्त। गारंटीड सेफ चेकआउट के साथ सुरक्षित भुगतान।
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="text-center">
              <div className="text-3xl">💳</div>
              <p className="text-gray-300 text-sm">VISA</p>
            </div>
            <div className="text-center">
              <div className="text-3xl">💳</div>
              <p className="text-gray-300 text-sm">Mastercard</p>
            </div>
            <div className="text-center">
              <div className="text-3xl">🏦</div>
              <p className="text-gray-300 text-sm">NET Banking</p>
            </div>
            <div className="text-center">
              <div className="text-3xl">📱</div>
              <p className="text-gray-300 text-sm">PhonePe</p>
            </div>
          </div>
        </div>
      </section>

      {/* ❓ FAQ SECTION */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
            अक्सर पूछे जाने वाले प्रश्न
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
            
            {/* Additional FAQ */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition-all">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-start">
                <span className="text-yellow-400 mr-3">Q.</span>
                क्या नकली प्रोडक्ट से बचने का कोई तरीका है?
              </h3>
              <p className="text-gray-300 flex items-start">
                <span className="text-green-400 mr-3">👉</span>
                अब Testro Booster के कई नकली प्रोडक्ट बनने लगे हैं इसलिए इसे केवल सप्लायर की ऑफिशियल साइट से ही ऑर्डर करें। नीचे दी गई लिंक पर क्लिक करके आपको एक क्लीनिकली टेस्ट किया हुआ Testro Booster इसके एकमात्र ऑफिशियल सप्लायर से 50% छूट पर मिलेगा।
              </p>
            </div>
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
                लिंग का आकार बढ़ाने और संभोग की अवधि बढ़ाने का वैज्ञानिक तरीका। स्वास्थ्य और परिवार कल्याण मंत्रालय द्वारा प्रमाणित।
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">त्वरित संपर्क</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={handleCallClick}
                    className="text-gray-400 hover:text-yellow-400 transition flex items-center"
                  >
                    📞 कॉल करें: +91 {phoneNumber}
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleWhatsAppClick}
                    className="text-gray-400 hover:text-yellow-400 transition flex items-center"
                  >
                    💬 व्हाट्सएप: +91 {phoneNumber}
                  </button>
                </li>
                <li className="text-gray-400">✉️ support@testrobooster.com</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">हमारे बारे में</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">हमारी कहानी</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">मिशन</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">गुणवत्ता मानक</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">कानूनी</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">गोपनीयता नीति</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">नियम और शर्तें</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-400 transition">शिपिंग नीति</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center mb-4 text-sm space-y-2 md:space-y-0 md:space-x-4">
              <span className="bg-green-800 text-white px-3 py-1 rounded-full">🔞</span>
              <span className="text-gray-300">आयु सत्यापित सामग्री | 18+ केवल</span>
              <span className="bg-blue-800 text-white px-3 py-1 rounded-full">🇮🇳</span>
              <span className="text-gray-300">मेड इन इंडिया | AYUSH/FSASI एप्रूव्ड</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              ⚠️ अस्वीकरण: Testro Booster एक वेलनेस सप्लीमेंट है। ये बयान किसी भी चिकित्सा प्राधिकरण द्वारा मूल्यांकित नहीं किए गए हैं। यह उत्पाद किसी भी बीमारी का निदान, इलाज, इलाज या रोकथाम करने के लिए अभिप्रेत नहीं है। परिणाम भिन्न हो सकते हैं। उपयोग से पहले अपने स्वास्थ्य देखभाल पेशेवर से परामर्श करें।
            </p>
            <p className="text-gray-500">
              © {new Date().getFullYear()} Testro Booster. सर्वाधिकार सुरक्षित।
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HealthVedaMain;