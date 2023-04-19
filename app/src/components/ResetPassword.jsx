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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Enter the email address associated with your account:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Reset Password
          </button>
          <p className="text-gray-600 text-sm">
            <a href="/Login" className="text-blue-500 hover:text-blue-700">
              Back to Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
