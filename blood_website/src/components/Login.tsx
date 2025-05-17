import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login (you can integrate actual authentication logic here)
    if (username === 'user' && password === 'password') {
      // Redirect to donation page after login
      navigate('/donate');
    } else {
      alert('Invalid login credentials');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8 py-20">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Login</h1>
      <form onSubmit={handleLogin} aria-label="login-form">
        <div className="mb-6">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mt-2"
            required
          />
        </div>
        <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
