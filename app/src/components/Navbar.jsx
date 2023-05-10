import React from 'react';

// import logo from "../assets/logo.jpg";

const ClickableLink = ({ href, text }) => (
  <a className="text-xs m-1 md:m-4 lg:m-4 " href={href}>
    {text}
  </a>
);

const Navbar = (props) => {
  console.log(props)
  return (
    <div className="flex justify-between pl-4 pr-4">
      <div className="m-4">
        {/* <img
					src={logo}
					className="min-w-[80px] max-w-[80px] sm:max-w-[100px] md:max-w-[200px] lg:w-[100px]"
				></img> */}
      </div>

      <div className="m-4 self-center">
        <ClickableLink href="/" text="Home" style={(props.currentIndex == "home")?"active":null}/>
        <ClickableLink href="/services" text="Services"  style={(props.currentIndex == "serviecs")?"active":null}/>
        <ClickableLink href="/contact-us" text="Contact Us"  style={(props.currentIndex == "contact")?"active":null}/>
        <ClickableLink href="/login" text="Login"  style={(props.currentIndex == "login")?"active":null}/>
        <ClickableLink href="/staffweb" text="Staff Web"  style={(props.currentIndex == "staff-home")?"active":null}/>
        <ClickableLink href="/adminweb" text="Admin Web"  style={(props.currentIndex == "admin-home")?"active":null}/>
      </div>
    </div>
  );
};


const styles={
  
}

export default Navbar;
