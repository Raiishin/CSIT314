import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  const authenticate = () => {
    // Add authentication logic here, e.g. make an API call to a server
    // If the authentication is successful, set the isAuthenticated state to true
    setIsAuthenticated(true);
  };

  // TODO: After login, redirect to home page
  //useEffect or import useHistory
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     // Redirect to the dashboard or home page
  //     return <Redirect to="/dashboard" />;
  //   }
  // }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="p-8 rounded-lg shadow-lg max-w-sm w-full" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className={`border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline `}
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <a href="/reset-password" className="text-light-blue hover:text-blue">
            Forgot your password?
          </a>
        </div>
        <div className="items-center justify-between">
          <button
            className="bg-light-blue hover:bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
