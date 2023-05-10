import React from 'react';
import logo from "../assets/img/cbimage.png";
import avatar from "../assets/img/avatar.jpg";

const ClickableLink = ({ href, text }) => (
  <a className="text-xs m-1 md:m-4 lg:m-4 " href={href}>
    {text}
  </a>
);

const AdminNavbar = (props) => {
  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <img
			src={logo}
			style={styles.logo}
		></img>
        <h1 style={styles.logoName}>Cinematic Adventures</h1>
      </div>

      <div style={styles.navContainer}>
        <div style={styles.navSubContainer}>
            <a href="/" style={(props.currentIndex == "admin-home")?styles.active:styles.navLink}>
            {"Home"}
            </a>
            <a href="/" style={(props.currentIndex == "cinema-movies")?styles.active:styles.navLink}>
            {"Cinema Movies"}
            </a>
            <a href="/" style={(props.currentIndex == "profiles")?styles.active:styles.navLink}>
            {"Profiles"}
            </a>
        </div>
        <div style={styles.navSubContainer2}>
            <a href="">
                <img
                    src={avatar}
                    style={styles.avatar}
                ></img>
            </a>
            <a href="" style={styles.logOutButton}>
               {"LogOut"}
            </a>
        </div>
      </div>
    </div>
  );
};

const styles={
    container:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderBottom: "1px solid white",
        padding: "10px",
        paddingBottom: "20px",
    }, 
    logo: {
        width: "70px",
        //height: "100%"
    },
    logoName: {
        fontSize: "15px",
        color: "#AC8B54",
    },
    logoContainer: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        alignItems: "center"
    },
    navContainer: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        //justifyContent: "flex-end"
    },
    navSubContainer: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    navSubContainer2: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end"
    },
    avatar: {
        width: "40px",
        marginRight: "1rem"
    },
    navLink: {
        color: "#AC8B54",

    },
    active: {
        color: "#AC8B54",
        borderBottom: "3px solid #5A6864"
    },
    logOutButton: {
        padding: "10px 20px",
        backgroundColor: "#4C453C",
        color: "#AC8B54",
        borderRadius: "50px"

    },
}

export default AdminNavbar;
