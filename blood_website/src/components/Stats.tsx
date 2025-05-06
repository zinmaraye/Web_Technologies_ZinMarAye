import React from 'react';
import { Users, Droplet, Calendar } from 'lucide-react';

const Stats = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-red-50">
            <Users className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-gray-900 mb-2">10,000+</h3>
            <p className="text-gray-600">Active Donors</p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-red-50">
            <Droplet className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-gray-900 mb-2">15,000+</h3>
            <p className="text-gray-600">Lives Saved</p>
          </div>
          
          <div className="text-center p-6 rounded-lg bg-red-50">
            <Calendar className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-4xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600">Monthly Donations</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;