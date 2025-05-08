import React from 'react';
import { Book, Heart, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom'; 
import { FaBookMedical, FaHeartbeat, FaUserFriends, FaMedal } from 'react-icons/fa';

const Education = () => {
  const resources = [
    {
      icon: <FaBookMedical className="text-4xl text-red-500" />,
      title: "Blood Donation Process",
      description: "Learn about the step-by-step process of donating blood and what to expect.",
      link: "/blood-donation-process" // Link to Blood Donation Process page
    },
    {
      icon: <FaHeartbeat className="text-4xl text-red-500" />,
      title: "Eligibility Requirements",
      description: "Find out if you're eligible to donate blood and what conditions might affect your ability to donate.",
      link: "/eligibility-requirements" // Link to Eligibility Requirements page
    },
    {
      icon: <FaUserFriends className="text-4xl text-red-500" />,
      title: "Impact Stories",
      description: "Read inspiring stories from donors and recipients about how blood donation has changed their lives.",
      link: "/impact-stories" // Link to Impact Stories page
    },
    {
      icon: <FaMedal className="text-4xl text-red-500" />,
      title: "Donor Recognition",
      description: "Learn about our donor recognition program and how we celebrate our regular donors.",
      link: "/donor-recognition" // Link to Donor Recognition page
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Blood Donation Education</h2>
          <p className="text-gray-600">Learn more about blood donation and its importance</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="mb-4">
                {resource.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
              <p className="text-gray-600">{resource.description}</p>
              <Link to={resource.link} className="mt-4 text-red-500 font-semibold hover:text-red-600">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Education;
