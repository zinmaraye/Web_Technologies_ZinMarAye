import React from 'react';
import { FaQuoteLeft, FaHeart } from 'react-icons/fa';

function ImpactStories() {
  const stories = [
    {
      id: 1,
      name: "Sarah Thompson",
      type: "Donor",
      story: "I've been donating blood every 3 months for the past 5 years. Knowing that my regular donations have helped save multiple lives gives me an incredible sense of purpose.",
      impact: "Regular donor who has helped save over 45 lives"
    },
    {
      id: 2,
      name: "Michael Chen",
      type: "Recipient",
      story: "After a severe car accident, I needed multiple blood transfusions. I'm alive today because of generous blood donors. Now, I advocate for blood donation whenever I can.",
      impact: "Received 5 units of blood during emergency surgery"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      type: "Healthcare Worker",
      story: "Working in the emergency department, I see firsthand how blood donations save lives every day. Each donation is precious and can make the difference between life and death.",
      impact: "Witnesses the impact of blood donation daily"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 py-10">Impact Stories</h1>
        <p className="text-center text-gray-600 mb-12">Real stories from donors and recipients</p>

        <div className="max-w-4xl mx-auto space-y-8">
          {stories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-start mb-6">
                  <FaQuoteLeft className="text-red-500 text-3xl mr-4 flex-shrink-0" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{story.name}</h2>
                    <p className="text-red-600 mb-4">{story.type}</p>
                    <p className="text-gray-700 italic mb-4">"{story.story}"</p>
                    <div className="flex items-center text-gray-600">
                      <FaHeart className="text-red-500 mr-2" />
                      <span>{story.impact}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-6">Your story could be next. Every donation makes a difference.</p>
          <button className="bg-red-600 text-white px-8 py-3 rounded-full hover:bg-red-700 transition-colors">
            Become a Donor Today
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImpactStories;