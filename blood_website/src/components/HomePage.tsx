import React from 'react';
import Banner from './Banner';
import Stats from './Stats';
import Event from './Event';
import UrgentNeeds from './UrgentNeeds';
import Gallery from './Gallery';
import Education from './Education';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div id="home" className="pt-16">
        <Banner />
      </div>

      {/* Stats Section */}
      <Stats />

      {/* Schedule Section */}
      <div id="event" className="py-1">
        <Event />
      </div>

      {/* Urgent Needs Section */}
      <div id="urgent-needs" className="py-1">
        <UrgentNeeds />
      </div>

      {/* Gallery Section */}
      <div id="gallery" className="py-1">
        <Gallery />
      </div>

      {/* Education Section */}
      <div id="education" className="py-1">
        <Education />
      </div>
    </div>
  );
}

export default HomePage;
