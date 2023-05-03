import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  const handleChange = event => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    // Check that the password and confirm password fields match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Submit the form data to the server or perform other actions as needed
    console.log(formData);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50">
      <h1 className="font-mono text-cyan-600 text-3xl font-large">Register</h1>
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-lg text-gray-400 font-medium mb-6">
          Already have an account?{' '}
          <a
            href="/login"
            className="text-light-blue text-cyan-600 hover:text-cyan-700 underline underline-offset-2">
            Login Here
          </a>{' '}
        </h2>
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
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-left text-cyan-600 block mb-2 font-medium" htmlFor="phone">
              Phone
            </label>
            <input
              className="hover:bg-cyan-50 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
              type="tel"
              name="phone"
              id="phone"
              pattern="[0-9]{8}"
              placeholder="e.g 12345678"
              value={formData.phone}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
            />
            <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
              Your password must be at least 7 characters long
            </span>
          </div>
          <div>
            <label
              className="text-left text-cyan-600 block mb-2 font-medium"
              htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="hover:bg-cyan-50 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline border-2 border-gray-300 group-invalid:pointer-events-none group-invalid:opacity-30"
              type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
