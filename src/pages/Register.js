import React from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Joi schema
const schema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters',
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Enter a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters',
  }),
});

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/avatar_book/user/register`,
        data
      );

      if (response?.data?.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-black mb-6">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register('name')}
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              {...register('password')}
              className="w-full px-5 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-base rounded-md bg-black text-white hover:bg-gray-900 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-black underline cursor-pointer"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
