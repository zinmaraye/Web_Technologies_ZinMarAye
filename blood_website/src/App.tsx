import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import BloodDonationProcess from './components/BloodDonationProcess';
import EligibilityRequirements from './components/EligibilityRequirements';
import ImpactStories from './components/ImpactStories';
import DonorRecognition from './components/DonorRecognition';
import Event from './components/Event';
import UrgentNeeds from './components/UrgentNeeds';
import Gallery from './components/Gallery';
import Education from './components/Education';
import Requirement from './components/Requirement';
import Profile from './components/Profile';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ScrollToTop />
        <Navbar />

        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Define routes for other pages */}
          <Route path="/blood-donation-process" element={<BloodDonationProcess />} />
          <Route path="/eligibility-requirements" element={<EligibilityRequirements />} />
          <Route path="/impact-stories" element={<ImpactStories />} />
          <Route path="/donor-recognition" element={<DonorRecognition />} />
          
          {/* Additional routes for each section */}
          <Route path="/event" element={<Event />} />
          <Route path="/urgent-needs" element={<UrgentNeeds />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/education" element={<Education />} />
          <Route path="/requirement" element={<Requirement />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
