import {React, useState, useRef} from 'react';
import AdminNavbar from './AdminNavbar';
import AdminTab1 from './AdminTab1';
import AdminTab2 from './AdminTab2';
import AdminTab3 from './AdminTab3';
import 'react-datepicker/dist/react-datepicker.css';
import "../assets/css/app.css";

function Adminweb(){
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

    var adminContent;
    
    if(activeTab == 1){
        adminContent = <AdminTab1/>
    }else if(activeTab == 2){
        adminContent= <AdminTab2/>
    }else if(activeTab == 3){
        adminContent= <AdminTab3/>
    }
    return (
        <div style={styles.container}>
            <AdminNavbar currentIndex="admin-home" />
            <div>
                <div style={styles.buttonContainer}>
                    <button style={activeTab == 1 ? styles.activeCinemabutton : styles.cinemabutton}
                            onClick={() => handleTabClick(1)}
                    >
                    AC Suntec
                    </button>
                    <button style={activeTab == 2 ? styles.activeCinemabutton : styles.cinemabutton}
                            onClick={() => handleTabClick(2)}
                    >
                    AC Vivo City
                    </button>
                    <button style={activeTab == 3 ? styles.activeCinemabutton : styles.cinemabutton}
                            onClick={() => handleTabClick(3)}
                    >
                    AC Kallang
                    </button>
                </div>
                {adminContent}
            </div>
        </div> 
    );
}

const styles = {
    container:{
      backgroundColor: "#272320",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "flex-start",
        marginTop: "50px",
        marginLeft: "20px"
    },
    cinemabutton: {
        padding: "1rem",
        backgroundColor: "#442C2C",
        color: "white",
        fontWeight: "bold",
        marginRight: "1px",
        alignSelf: "flex-start",
        border: "1px solid black"
    },
    activeCinemabutton: {
        padding: "1rem",
        backgroundColor: "#442C2C",
        color: "#BD8B39",
        fontWeight: "bold",
        marginRight: "1px",
        alignSelf: "flex-start",
        border: "1px solid black"
    },
}

export default Adminweb;