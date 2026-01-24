// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HealthVedaMain from './Components/HealthVedaMain.jsx';
import OrderForm from './Components/OrderForm.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Routes>
          <Route path="/" element={<HealthVedaMain />} />
          <Route path="/order-form" element={<OrderForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;