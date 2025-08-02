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
    'string.min': 'Name must be at least 3 characters'
  }),
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be valid'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters'
  })
});

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: joiResolver(schema)
  });


  const onSubmit = async (data) => {
    // Dummy auth logic
    // localStorage.setItem('authToken', 'sample-token');
    // setIsLoggedIn(true);
    // navigate('/book-page');
    console.log(data)
    const payload = data
    try {
      const response_data = await axios.post(`${process.env.REACT_APP_BACKEND_API}/avatar_book/user/register`, payload)

    } catch (error) {
      console.log("call", error)

    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            {...register('name')}
            className="border border-gray-300 rounded p-2 w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className="border border-gray-300 rounded p-2 w-full"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className="border border-gray-300 rounded p-2 w-full"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

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
