import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function EligibilityRequirements() {
  const eligibilityCriteria = [
    {
      category: "Physical Requirements",
      criteria: [
        {
          title: "Age",
          eligible: "18-55 years old",
          notEligible: "Under 18 or over 55 years"
        },
        {
          title: "Weight",
          eligible: "At least 130 lbs (59 kg)",
          notEligible: "Less than 130 lbs"
        },
        {
          title: "Blood Pressure",
          eligible: "Between 100/60 and 180/100 mmHg",
          notEligible: "Outside normal range"
        }
      ]
    },
    {
      category: "Health Requirements",
      criteria: [
        {
          title: "General Health",
          eligible: "Good overall health",
          notEligible: "Current illness or infection"
        },
        {
          title: "Medications",
          eligible: "Most regular medications",
          notEligible: "Blood thinners, certain antibiotics"
        },
        {
          title: "Recent Surgery",
          eligible: "6+ months post-surgery",
          notEligible: "Recent surgery (within 6 months)"
        }
      ]
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 py-10">Eligibility Requirements</h1>
        <p className="text-center text-gray-600 mb-12">Detailed criteria for blood donation eligibility</p>

        <div className="max-w-4xl mx-auto space-y-8">
          {eligibilityCriteria.map((category, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-red-600 text-white py-3 px-6">
                <h2 className="text-xl font-semibold">{category.category}</h2>
              </div>
              <div className="p-6">
                {category.criteria.map((item, index) => (
                  <div key={index} className="mb-6 last:mb-0 border-b last:border-0 pb-6 last:pb-0">
                    <h3 className="text-lg font-semibold mb-4">{item.title}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center text-green-600 mb-2">
                          <FaCheckCircle className="mr-2" />
                          <span className="font-semibold">Eligible</span>
                        </div>
                        <p className="text-gray-700">{item.eligible}</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="flex items-center text-red-600 mb-2">
                          <FaTimesCircle className="mr-2" />
                          <span className="font-semibold">Not Eligible</span>
                        </div>
                        <p className="text-gray-700">{item.notEligible}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EligibilityRequirements;