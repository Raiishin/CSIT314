import React, { useState } from 'react';
import { createUser } from '../api/user.js';
import useGlobalStore from '../store/globalStore';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    // Check that the password and confirm password fields match
    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }

    const response = await createUser(name, email, password, phoneNumber);

    // Will return a message if an error occurred
    if (response.message) {
      return alert(response.message);
    }

    // If successful, will return the user id
    if (response.id) {
      // Set global state and redirect back to homepage
      useGlobalStore.setState({
        userId: response.id,
        accessLevel: response.type,
        name: response.name,
        email: response.email,
        phoneNumber: response.phoneNumber,
        loyaltyPoints: response.loyaltyPoints ?? 0
      });

      return navigate('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50">
      <h1 className="font-mono text-cyan-600 text-3xl font-large">Register</h1>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <div className="flex">
          <h2 className="flex text-lg text-gray-400 font-medium mb-6">
            Already have an account?
            <div
              className="ml-2 flex text-light-blue text-cyan-600 hover:text-cyan-700 underline underline-offset-2 cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Login Here
            </div>
          </h2>
        </div>
        <form className="space-y-6 group" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="text-left text-cyan-600 block mb-2 font-medium" htmlFor="name">
              Name
            </label>
            <input
              className="hover:bg-cyan-50 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              type="text"
              name="name"
              id="name"
              placeholder="e.g John Doe"
              value={name}
              onChange={async e => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <label className="text-left text-cyan-600 block mb-2 font-medium" htmlFor="phone">
              Phone
            </label>
            <input
              className="hover:bg-cyan-50 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
              type="number"
              name="phone"
              id="phone"
              pattern="[8-9]{1}[0-9]{7}"
              placeholder="e.g 81234567"
              value={phoneNumber}
              onChange={async e => {
                setPhoneNumber(e.target.value);
              }}
              required
            />
            <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              Please enter a valid Singapore phone number
            </span>
          </div>

          <div>
            <label className="text-left text-cyan-600 block mb-2 font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="hover:bg-cyan-50 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
              type="email"
              name="email"
              id="email"
              placeholder="e.g email@email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              value={email}
              onChange={async e => {
                setEmail(e.target.value);
              }}
              required
            />
            <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              Please enter a valid email address
            </span>
          </div>
          <div>
            <label className="text-left text-cyan-600 block mb-2 font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="hover:bg-cyan-50 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              pattern=".{7,}"
              value={password}
              onChange={async e => {
                setPassword(e.target.value);
              }}
            />
            <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              Your password must be at least 7 characters long
            </span>
          </div>
          <div>
            <label
              className="text-left text-cyan-600 block mb-2 font-medium"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="hover:bg-cyan-50 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Enter your password"
              value={confirmPassword}
              onChange={async e => {
                setConfirmPassword(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              className="bg-cyan hover:bg-dark-cyan text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline border-2 border-gray-300 group-invalid:pointer-events-none group-invalid:opacity-30"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
