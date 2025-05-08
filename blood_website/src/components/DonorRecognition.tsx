import React from 'react';
import { FaMedal, FaTrophy, FaStar, FaCrown } from 'react-icons/fa';

function DonorRecognition() {
  const donorLevels = [
    {
      level: "Bronze Donor",
      icon: <FaMedal className="text-yellow-700 text-4xl" />,
      criteria: "3-5 donations",
      benefits: [
        "Digital badge for social media",
        "Recognition on donor wall",
        "Quarterly newsletter subscription"
      ]
    },
    {
      level: "Silver Donor",
      icon: <FaTrophy className="text-gray-400 text-4xl" />,
      criteria: "6-10 donations",
      benefits: [
        "All Bronze benefits",
        "Exclusive donor events invitation",
        "Priority scheduling for donations"
      ]
    },
    {
      level: "Gold Donor",
      icon: <FaStar className="text-yellow-400 text-4xl" />,
      criteria: "11-20 donations",
      benefits: [
        "All Silver benefits",
        "Personalized donation certificate",
        "Annual recognition ceremony invitation",
        "Custom donor pin"
      ]
    },
    {
      level: "Platinum Donor",
      icon: <FaCrown className="text-purple-600 text-4xl" />,
      criteria: "20+ donations",
      benefits: [
        "All Gold benefits",
        "Special mention in annual report",
        "VIP parking at donation centers",
        "Lifetime achievement award"
      ]
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 py-10">Donor Recognition Program</h1>
        <p className="text-center text-gray-600 mb-12">Celebrating our dedicated blood donors</p>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {donorLevels.map((level, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform duration-300">
              <div className="text-center mb-6">
                {level.icon}
                <h2 className="text-xl font-bold mt-4">{level.level}</h2>
                <p className="text-red-600 mt-2">{level.criteria}</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 mb-2">Benefits:</h3>
                <ul className="space-y-2">
                  {level.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <span className="mr-2">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-6">Start your journey as a blood donor today</p>
          <button className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default DonorRecognition;