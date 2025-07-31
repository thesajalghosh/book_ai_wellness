import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy registration logic
    if (formData.name && formData.email && formData.password) {
      console.log('User registered:', formData);
      alert('Registration successful! Now login.');
      navigate('/login');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="border border-gray-300 rounded p-2 w-full"
          onChange={handleChange}
          value={formData.name}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-300 rounded p-2 w-full"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-300 rounded p-2 w-full"
          onChange={handleChange}
          value={formData.password}
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
