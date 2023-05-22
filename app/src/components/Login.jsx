import { useState } from 'react';
import { loginUser } from '../api/user.js';
import useGlobalStore from '../store/globalStore';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const response = await loginUser(email, password);

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
      <h1 className="font-mono text-cyan text-3xl font-large">Login</h1>
      <form className="p-8 rounded-lg shadow-lg max-w-sm w-full group" onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="flex">
            <h2 className="flex text-lg text-gray-400 font-medium mb-6">
              Don't have an account?
              <div
                className="ml-2 flex text-light-blue text-cyan hover:text-dark-cyan underline underline-offset-2 cursor-pointer"
                onClick={() => navigate('/register')}
              >
                Register Here
              </div>
            </h2>
          </div>

          <label
            className="text-left text-cyan block text-gray-700 font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`border rounded w-full hover:bg-cyan-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer`}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={async e => {
              setEmail(e.target.value);
            }}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
          />
          <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Please enter a valid email address
          </span>
        </div>
        <div className="mb-6">
          <label
            className="text-left text-cyan-600 block text-gray-700 font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`border rounded w-full hover:bg-cyan-50 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer`}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={async e => {
              setPassword(e.target.value);
            }}
            required
          />
          <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Please enter your password
          </span>
        </div>
        <div className="items-center justify-between">
          <button
            className="bg-cyan hover:bg-dark-cyan text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline border-2 border-gray-300 group-invalid:pointer-events-none group-invalid:opacity-30"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <div
          className="cursor-pointer text-cyan hover:text-blue"
          onClick={() => navigate('/reset-password')}
        >
          Forgot your password?
        </div>
      </form>
    </div>
  );
};

export default Login;
