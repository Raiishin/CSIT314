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
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50">
      <h1 className="font-mono text-cyan-600 text-3xl font-large">Login</h1>
      <form className="p-8 rounded-lg shadow-lg max-w-sm w-full group" onSubmit={handleSubmit}>
        <div className="mb-4">
          <h2 className="text-lg text-gray-400 font-medium mb-6">
            Don't have an account?{' '}
            <a
              href="/register"
              className="text-light-blue text-cyan-600 hover:text-cyan-700 underline underline-offset-2">
              Register Here
            </a>{' '}
          </h2>
          <label
            className="text-left text-cyan-600 block text-gray-700 font-medium mb-2"
            htmlFor="email">
            Email
          </label>
          <input
            className={`border rounded w-full hover:bg-cyan-50 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer`}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
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
            htmlFor="password">
            Password
          </label>
          <input
            className={`border rounded w-full hover:bg-cyan-50 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer`}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <span class="mt-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
            Please enter your password
          </span>
        </div>
        <div className="items-center justify-between">
          <button
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline border-2 border-gray-300 group-invalid:pointer-events-none group-invalid:opacity-30"
            type="submit">
            Sign In
          </button>
        </div>
        <a href="/reset-password" className="text-cyan-600 hover:text-blue">
          Forgot your password?
        </a>
      </form>
    </div>
  );
};

export default Login;