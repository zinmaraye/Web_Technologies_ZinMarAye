function DonationForm() {
    return (
      <form className="space-y-4 p-4 bg-white rounded shadow-md max-w-md mx-auto">
        <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" required />
        <select className="w-full border p-2 rounded" required>
          <option value="">Select Blood Type</option>
          <option>A+</option><option>B+</option><option>AB+</option><option>O+</option>
          <option>A-</option><option>B-</option><option>AB-</option><option>O-</option>
        </select>
        <input type="email" placeholder="Email" className="w-full border p-2 rounded" required />
        <input type="text" placeholder="Location" className="w-full border p-2 rounded" required />
        <button type="submit" className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
          Donate
        </button>
      </form>
    );
  }
  export default DonationForm;
  