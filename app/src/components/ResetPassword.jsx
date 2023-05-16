import { useState } from 'react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Add reset password logic here, e.g. make an API call to a server
    // If the password reset is successful, set the successMessage state to a success message
    // If there's an error, set the errorMessage state to an error message
    setSuccessMessage(
      'Your password has been reset. Please check your email for instructions on how to create a new password.'
    );
    setErrorMessage('There was an error resetting your password. Please try again later.');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50">
      <h1 className="font-mono text-cyan-600 text-3xl font-large">Reset Password</h1>
      <form
        className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full group"
        onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-left block text-gray-700 font-bold mb-2" htmlFor="email">
            Enter the email address associated with your account:
          </label>
          <input
            className=" hover:bg-cyan-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
            id="email"
            type="email"
            placeholder="Email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Please enter a valid email address
          </span>
        </div>
        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
            role="alert">
            <p className="font-bold">{successMessage}</p>
          </div>
        )}
        {errorMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
            role="alert">
            <p className="font-bold">{errorMessage}</p>
          </div>
        )}
        <div className="items-center justify-between">
          <button
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline group-invalid:pointer-events-none group-invalid:opacity-30"
            type="submit">
            Reset Password
          </button>
        </div>
        <div
          className="text-cyan-500 hover:text-cyan-700 text-lg cursor-pointer"
          onClick={() => navigate('/login')}>
          Back to Login
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
