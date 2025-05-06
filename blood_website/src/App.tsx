import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components from react-router-dom
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Stats from './components/Stats';
import Schedule from './components/Schedule';
import UrgentNeeds from './components/UrgentNeeds';
import Gallery from './components/Gallery';
import Education from './components/Education';
import BloodDonationProcess from './components/BloodDonationProcess'; 
import EligibilityRequirements from './components/EligibilityRequirements';
// import ImpactStories from './components/ImpactStories'; 
// import DonorRecognition from './components/DonorRecognition';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div id="home" className="pt-16">
          <Banner />
        </div>
        <Stats />
        <div id="schedule">
          <Schedule />
        </div>
        <div id="urgent-needs">
          <UrgentNeeds />
        </div>
        <div id="gallery">
          <Gallery />
        </div>
        <div id="education">
          <Education />
        </div>

        {/* Main Content with Routes */}
        <Routes>
          <Route path="/" element={
            <main className="p-8 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Every Drop Counts</h1>
              <p className="text-lg text-gray-600 mb-6">
                Your blood donation can save up to three lives. Join our mission to ensure no one runs out of blood when they need it most.
              </p>
              <button className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition duration-200">
                Become a Donor
              </button>
            </main>
          } />
          
          {/* Define routes for detailed pages */}
          <Route path="/blood-donation-process" element={<BloodDonationProcess />} />
          <Route path="/eligibility-requirements" element={<EligibilityRequirements />} />
          {/* <Route path="/impact-stories" element={<ImpactStories />} /> */}
          {/* <Route path="/donor-recognition" element={<DonorRecognition />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
