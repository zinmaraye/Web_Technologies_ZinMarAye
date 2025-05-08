import React, { useState } from 'react';
import axios from 'axios';

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
}

function Modal({ showModal, closeModal }: ModalProps) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [name, setName] = useState(''); // Name state (for registration)
  const [email, setEmail] = useState(''); // Email state
  const [password, setPassword] = useState(''); // Password state
  const [passwordConfirmation, setPasswordConfirmation] = useState(''); // Confirm Password state (for registration)
  const [error, setError] = useState(''); // Error message state

  const toggleForm = () => {
    setIsLogin(!isLogin); // Switch between Login and Register forms
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      console.log('Login response:', response.data);
      alert('Login successful!');
      closeModal();
    } catch (error: any) {
      console.error('Error during login:', error);
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      console.log('Registration response:', response.data);
      alert('Registration successful!');
      closeModal();
    } catch (error: any) {
      console.error('Error during registration:', error.response?.data || error);
      setError('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${showModal ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Login Form */}
        {isLogin ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Login</button>
          </form>
        ) : (
          // Register Form
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-semibold">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-semibold">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Create a password"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="passwordConfirmation" className="block text-sm font-semibold">Confirm Password</label>
              <input
                type="password"
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Confirm your password"
                required
              />
            </div>
            <button type="submit" className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Register</button>
          </form>
        )}

        {/* Toggle between Login and Register */}
        <div className="mt-4 text-center">
          <button
            onClick={toggleForm}
            className="text-sm text-blue-600 hover:text-blue-700">
            {isLogin ? 'Need an account? Register here' : 'Already have an account? Login here'}
          </button>
        </div>

        {/* Close button */}
        <div className="mt-4 text-center">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
