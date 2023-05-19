import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import useGlobalStore from '../store/globalStore';
import { updateUser } from '../api/user.js';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const userId = useGlobalStore(state => state.userId);
  const name = useGlobalStore(state => state.name);
  const email = useGlobalStore(state => state.email);
  const phoneNumber = useGlobalStore(state => state.phoneNumber);
  const loyaltyPoints = useGlobalStore(state => state.loyaltyPoints);

  useEffect(() => {
    setUserPhoneNumber(phoneNumber);

    setPassword('');
    setConfirmPassword('');

    setShowPassword(false);
    setSuccessMessage('');
  }, [isEditing]);

  const handleSaveClick = async e => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if password and confirm password are equal
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        return alert('Passwords do not match');
      }

      const response = await updateUser(userId, password, userPhoneNumber);

      // Will return a message if an error occurred
      if (response.message) {
        return alert(response.message);
      }

      // If successful, will return the user id
      if (response.id) {
        // Set global state and redirect back to homepage
        useGlobalStore.setState({ phoneNumber: response.phoneNumber });
        setUserPhoneNumber(response.phoneNumber);

        setShowPassword(false);

        setIsEditing(false);
        setSuccessMessage('Profile successfully updated!');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg text-center">
      <div className="flex justify-center items-center mb-4">
        <FaUserCircle className="text-4xl text-gray-500 mr-2" />
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      {successMessage && (
        <div className="mb-4 bg-green-100 text-green-800 p-2 rounded">{successMessage}</div>
      )}

      {isEditing ? (
        <>
          <form className="group" onSubmit={handleSaveClick} noValidate>
            <div className="mb-4">
              <label className="text-gray-700 font-bold mb-2">Name</label>
              <input value={name} disabled className="border rounded-lg px-3 py-2 w-full" />
            </div>

            <div className="mb-4">
              <label className="text-gray-700 font-bold mb-2">Email Address</label>
              <input value={email} disabled className="border rounded-lg px-3 py-2 w-full" />
            </div>

            <div className="mb-4">
              <label className="text-gray-700 font-bold mb-2">Phone Number</label>
              <input
                type="number"
                pattern="[8-9]{1}[0-9]{7}"
                name="phoneNumber"
                value={userPhoneNumber}
                onChange={async e => {
                  setUserPhoneNumber(e.target.value);
                }}
                className="appearance-no-arrow focus:ring-transparent block hover:bg-cyan-50 border rounded-lg px-3 py-2 w-full invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
                required
              />
            </div>

            <div className="mb-4 relative">
              <label className="text-gray-700 font-bold mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                pattern=".{7,}"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="hover:bg-cyan-50 border rounded-lg px-3 py-2 w-full pr-10 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
              />

              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-4"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="text-gray-400 hover:text-gray-600" />
                )}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="text-gray-700 font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="hover:bg-cyan-50 border rounded-lg px-3 py-2 w-full"
              />
            </div>

            <div className="flex justify-end">
              <button
                className={`bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mr-2 `}
                type="submit"
              >
                Save
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="mb-4">
            <strong className="text-gray-700 font-bold">Name:</strong> {name}
          </div>

          <div className="mb-4">
            <strong className="text-gray-700 font-bold">Email:</strong> {email}
          </div>

          <div className="mb-4">
            <strong className="text-gray-700 font-bold">Phone Number:</strong> {phoneNumber}
          </div>

          <div className="mb-4">
            <strong className="text-gray-700 font-bold">Password:</strong> ********
          </div>

          <div className="mb-4">
            <strong className="text-gray-700 font-bold">Loyalty Points:</strong> {loyaltyPoints}
          </div>

          <div className="flex justify-end">
            <button
              className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
