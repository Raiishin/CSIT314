import React from 'react';
import useGlobalStore from '../store/globalStore';
import { useNavigate } from 'react-router-dom';

// import logo from "../assets/logo.jpg";

const Navbar = () => {
  const userId = useGlobalStore(state => state.userId);
  const isUserLoggedIn = userId !== '';

  const navigate = useNavigate();

  const ClickableLink = ({ link, text }) => (
    <a className="text-xs m-1 md:m-4 lg:m-4 cursor-pointer" onClick={() => navigate(link)}>
      {text}
    </a>
  );

  return (
    <div className="flex justify-between pl-4 pr-4">
      <div className="m-4">
        {/* <img
					src={logo}
					className="min-w-[80px] max-w-[80px] sm:max-w-[100px] md:max-w-[200px] lg:w-[100px]"
				></img> */}
      </div>

      <div className="m-4 self-center">
        <ClickableLink link="/" text="Home" />
        <ClickableLink link="/services" text="Services" />
        <ClickableLink link="/contact-us" text="Contact Us" />
        {isUserLoggedIn ? (
          <ClickableLink link="/profile" text="Profile" />
        ) : (
          <ClickableLink link="/login" text="Login" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
