import React, { useState } from 'react';

function Donate() {
  const [donationAmount, setDonationAmount] = useState('');

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    // Process the donation logic
    alert(`Thank you for donating ${donationAmount}!`);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 py-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Donate Now</h1>
      <form onSubmit={handleDonate}>
        <div className="mb-6">
          <label htmlFor="amount" className="block text-gray-700">Donation Amount</label>
          <input
            type="number"
            id="amount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700">
          Donate
        </button>
      </form>
    </div>
  );
}

export default Donate;
