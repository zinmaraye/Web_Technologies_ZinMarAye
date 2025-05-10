import React, { useState } from 'react';
import axios from 'axios';

interface ModalProps {
  showModal: boolean;
  closeModal: () => void;
  onLoginSuccess: (userData: any) => void;
}

function Modal({ showModal, closeModal, onLoginSuccess }: ModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLoginSuccess(response.data.user);
      closeModal();
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/register', { name, email, password, password_confirmation: passwordConfirmation });
      localStorage.setItem('user', JSON.stringify(response.data.user));
      onLoginSuccess(response.data.user);
      closeModal();
    } catch (error) {
      setError('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${showModal ? 'block' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">{isLogin ? 'Login' : 'Register'}</h2>
          <button onClick={closeModal} className="px-4 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500">Close</button>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {isLogin ? (
          <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 px-3 py-2 border rounded-md" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full mb-2 px-3 py-2 border rounded-md" required />
            <button type="submit" className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Login</button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full mb-2 px-3 py-2 border rounded-md" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 px-3 py-2 border rounded-md" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full mb-2 px-3 py-2 border rounded-md" required />
            <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} placeholder="Confirm Password" className="w-full mb-2 px-3 py-2 border rounded-md" required />
            <button type="submit" className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Register</button>
          </form>
        )}

        <div className="mt-4 text-center">
          <button onClick={toggleForm} className="text-blue-600 hover:text-blue-700">
            {isLogin ? 'Need an account? Register here' : 'Already have an account? Login here'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;