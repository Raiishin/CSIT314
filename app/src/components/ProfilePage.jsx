import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import useGlobalStore from '../store/globalStore';
import { updateUser } from '../api/user.js';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isPasswordsMatch, setIsPasswordsMatch] = useState(true);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

  const userId = useGlobalStore(state => state.userId);
  const name = useGlobalStore(state => state.name);
  const email = useGlobalStore(state => state.email);
  const phoneNumber = useGlobalStore(state => state.phoneNumber);
  const loyaltyPoints = useGlobalStore(state => state.loyaltyPoints);

  useEffect(() => {
    setUserPhoneNumber(phoneNumber);
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);

    setPasswordMatchError(false);
    setShowConfirmPassword(false);
    setSuccessMessage('');
  };

  const handleCancelClick = () => {
    setIsEditing(false);

    setPasswordMatchError(false);
    setShowConfirmPassword(false);
    setShowPassword(false);
    setSuccessMessage('');
  };

  const handleSaveClick = async e => {
    e.preventDefault(); // Prevent the default form submission behavior

    const response = await updateUser(userId, password, userPhoneNumber);

    console.log(response);

    useGlobalStore.setState({ phoneNumber: response.phoneNumber });
    setUserPhoneNumber(response.phoneNumber);

    setShowPassword(false);

    // if (showConfirmPassword && formData.password !== formData.confirmPassword) {
    //   setPasswordMatchError(true);
    //   setIsEditing(true);
    // }
    // if (!isPasswordsMatch || isContactNumberInvalid) {
    //   return;
    // }
    // if (isPasswordsMatch) {

    // }

    // Here, you can make the API call to save the updated profile data
    // You can use the formData object to access the updated values
    // For simplicity, we're just updating the state in this example
    // if (showConfirmPassword && formData.password === formData.confirmPassword) {
    // setProfileData(formData);
    setIsEditing(false);
    setPasswordMatchError(false);
    setShowConfirmPassword(false);
    setSuccessMessage('Profile successfully updated!');
    // return;
    // }
  };

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === 'password') {
      if (!showConfirmPassword && value !== '') {
        const confirmed = window.confirm('Do you wish to change your password?');
        setShowConfirmPassword(confirmed);
      } else if (showConfirmPassword && value === '') {
        setShowConfirmPassword(false);

        setPasswordMatchError(false);
      }
    }

    // if (name === 'confirmPassword') {
    //   setPasswordMatchError(value !== formData.password);
    //   setIsPasswordsMatch(value === formData.password);
    // }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
              {/* <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Please enter a valid Singapore phone number
              </span> */}
            </div>

            <div className="mb-4 relative">
              <label className="text-gray-700 font-bold mb-2">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                pattern=".{7,}"
                value={password}
                onChange={handleChange}
                className="hover:bg-cyan-50 border rounded-lg px-3 py-2 w-full pr-10 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
              />
              {/* <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                Your password must be at least 7 characters long
              </span> */}
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-4"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <FaEye className="text-gray-400 hover:text-gray-600" />
                )}
              </div>
            </div>

            {showConfirmPassword && (
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="text-gray-700 font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  type="text"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  className="hover:bg-cyan-50 border rounded-lg px-3 py-2 w-full"
                />
                {passwordMatchError && (
                  <p className="text-red-500 text-sm mt-2">Passwords do not match</p>
                )}
              </div>
            )}

            <div className="flex justify-end">
              <button
                className={`bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mr-2 ${
                  isSaveButtonDisabled
                    ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400'
                    : showConfirmPassword && (!isPasswordsMatch || confirmPassword === '')
                    ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400'
                    : ''
                }`}
                //   onClick={handleSaveClick}
                // disabled={isSaveButtonDisabled || !isPasswordsMatch}
                type="submit"
              >
                Save
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={handleCancelClick}
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
            <strong className="text-gray-700 font-bold">Loyalty Points:</strong> ${loyaltyPoints}
          </div>

          <div className="flex justify-end">
            <button
              className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleEditClick}
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
