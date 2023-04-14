import React from 'react';

// import logo from "../assets/logo.jpg";

const ClickableLink = ({ href, text }) => (
  <a className="text-xs m-1 md:m-4 lg:m-4 " href={href}>
    {text}
  </a>
);

const Navbar = () => {
  return (
    <div className="flex justify-between pl-4 pr-4">
      <div className="m-4">
        {/* <img
					src={logo}
					className="min-w-[80px] max-w-[80px] sm:max-w-[100px] md:max-w-[200px] lg:w-[100px]"
				></img> */}
      </div>

      <div className="m-4 self-center">
        <ClickableLink href="/" text="Home" />
        <ClickableLink href="/services" text="Services" />
        <ClickableLink href="/contact-us" text="Contact Us" />
      </div>
    </div>
  );
};

export default Navbar;
