import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Validation schema using Joi
const schema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Enter a valid email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters',
  }),
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const [loading , setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: joiResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/avatar_book/user/login`,
        data
      );
      console.log("response>>>>>>>", response)

      if(response?.data?.success && response?.data?.user?.is_subscription){
        console.log("call..")
        navigate('/book-page');
      }else{
         console.log("call..2222")
         console.log("from---", from)
         localStorage.setItem('access-token', response.data.token);
         navigate(from, { replace: true });
      }

      // if (response?.data?.success) {
      //    localStorage.setItem('access-token', response.data.token);
      //    navigate(from, { replace: true });
      // }
    } catch (err) {
      console.error('Login error:', err);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-black mb-6">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              placeholder="Enter your password"
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
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 border-2 border-t-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            className="text-black underline cursor-pointer"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
