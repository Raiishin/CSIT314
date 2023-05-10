import {React, useState, useRef} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../assets/css/app.css";

function AdminTab2(){
    const inputRef1M = useRef(null);
    const inputRef1N = useRef(null);
    const inputRef2M = useRef(null);
    const inputRef2N = useRef(null);

    const [selectedMovie, setSelectedMovie] = useState(null);
    const selectMovie = (val) => {
        setSelectedMovie(val.target.value);
    };

    const [selectedDate1M, setSelectedDate1M] = useState(null);
    const [selectedDate1N, setSelectedDate1N] = useState(null);
    const [selectedDate2M, setSelectedDate2M] = useState(null);
    const [selectedDate2N, setSelectedDate2N] = useState(null);

    const [selectedTime, setSelectedTime] = useState(null);
    const selectTime = (val) => {
        setSelectedTime(val.target.value);
    };
    
    const [selectedButton, setSelectedButton] = useState(null);

    function pickDateHall1M(date){
        setSelectedDate1M(date)
       
        var formatedDate = new Date(date)
        var formatedDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        var formatedMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        inputRef1M.current.value = formatedDays[formatedDate.getDay()] + ", " + formatedDate.getDate() + " " + formatedMonth[formatedDate.getMonth()] + " " + formatedDate.getFullYear()
    }

    function pickDateHall1N(date){
        setSelectedDate1N(date)
       
        var formatedDate = new Date(date)
        var formatedDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        var formatedMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        inputRef1N.current.value = formatedDays[formatedDate.getDay()] + ", " + formatedDate.getDate() + " " + formatedMonth[formatedDate.getMonth()] + " " + formatedDate.getFullYear()
    }

    function pickDateHall2M(date){
        setSelectedDate2M(date)
       
        var formatedDate = new Date(date)
        var formatedDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        var formatedMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        inputRef2M.current.value = formatedDays[formatedDate.getDay()] + ", " + formatedDate.getDate() + " " + formatedMonth[formatedDate.getMonth()] + " " + formatedDate.getFullYear()
    }

    function pickDateHall2N(date){
        setSelectedDate2N(date)
       
        var formatedDate = new Date(date)
        var formatedDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        var formatedMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        inputRef2N.current.value = formatedDays[formatedDate.getDay()] + ", " + formatedDate.getDate() + " " + formatedMonth[formatedDate.getMonth()] + " " + formatedDate.getFullYear()
    }

    return(
        <div>
                <div style={styles.hallsContainer}>
                    <div style={styles.hallRow}>
                        <div style={styles.hallSection}>
                            <h2 style={styles.h2Style}>Hall 1</h2>
                            <h3 style={styles.h3Style}>Morning</h3>
                            <div style={styles.movieSelectContainer}>
                                <p style={styles.titleText}>
                                    {"Movie"}
                                </p>
                                <select onChange={(val) => selectMovie(val)} style={styles.selectStyle}>
                                    <option value="-1">-- Movies --</option>
                                    <option value="0">Movie 1</option>
                                    <option value="1">Movie 2</option>
                                    <option value="2">Movie 3</option>
                                </select>
                            </div>
                            <div style={styles.movieSelectContainer}>
                                <p style={styles.titleText}>{"Date"}
                                
                                </p>
                                <input ref={inputRef1M} type="text" style={styles.selectStyle} disabled/>
                            </div>
                            <div style={{ padding: "15px"}}>
                                <DatePicker
                                    selected={selectedDate1M}
                                    onChange={(date) => pickDateHall1M(date)}
                                    dateFormat="dd/MM/yyyy"
                                    inline={true}
                                    minDate={new Date()}
                                    
                                />
                            </div>
                            <div style={styles.movieSelectContainer}>
                                <p style={styles.titleText}>
                                    {"Time"}
                                </p>
                                <select onChange={(val) => selectTime(val)} style={styles.selectStyle}>
                                    <option value="-1">-- Time --</option>
                                    <option value="0">Time 1</option>
                                    <option value="1">Time 2</option>
                                    <option value="2">Time 3</option>
                                </select>
                            </div>
                        </div>
                        <div style={styles.hallSection}>
                            <h2 style={styles.h2Style}>Hall 1</h2>
                            <h3 style={styles.h3Style}>Night</h3>
                            <div style={styles.movieSelectContainer}>
                                <p style={styles.titleText}>
                                    {"Movie"}
                                </p>
                                <select onChange={(val) => selectMovie(val)} style={styles.selectStyle}>
                                    <option value="-1">-- Movies --</option>
                                    <option value="0">Movie 1</option>
                                    <option value="1">Movie 2</option>
                                    <option value="2">Movie 3</option>
                                </select>
                            </div>
                            <div style={styles.movieSelectContainer}>
                                <p style={styles.titleText}>{"Date"}
                                
                                </p>
                                <input ref={inputRef1N} type="text" style={styles.selectStyle} disabled/>
                            </div>
                            <div style={{ padding: "15px"}}>
                                <DatePicker
                                    selected={selectedDate1N}
                                    onChange={(date) => pickDateHall1N(date)}
                                    dateFormat="dd/MM/yyyy"
                                    inline={true}
                                    minDate={new Date()}
                                    
                                />
                            </div>
                            <div style={styles.movieSelectContainer}>
                                <p style={styles.titleText}>
                                    {"Time"}
                                </p>
                                <select onChange={(val) => selectTime(val)} style={styles.selectStyle}>
                                    <option value="-1">-- Time --</option>
                                    <option value="0">Time 1</option>
                                    <option value="1">Time 2</option>
                                    <option value="2">Time 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div style={styles.hallRow}>
                        <div style={styles.hallSection}>
                            <h2 style={styles.h2Style}>Hall 2</h2>
                            <h3 style={styles.h3Style}>Morning</h3>
                            <div style={styles.movieSelectContainer}>
                                <p style={styles.titleText}>
                                    {"Movie"}
                                </p>
                                <select onChange={(val) => selectMovie(val)} style={styles.selectStyle}>
                                    <option value="-1">-- Movies --</option>
                                    <option value="0">Movie 1</option>
                                    <option value="1">Movie 2</option>
                                    <option value="2">Movie 3</option>
                                </select>
                            </div>
                            <div style={styles.movieSelectContainer}>
                                <p style={styles.titleText}>{"Date"}
                                
                                </p>
                                <input ref={inputRef2M} type="text" style={styles.selectStyle} disabled/>
                            </div>
                            <div style={{ padding: "15px"}}>
                                <DatePicker
                                    selected={selectedDate2M}
                                    onChange={(date) => pickDateHall2M(date)}
                                    dateFormat="dd/MM/yyyy"
                                    inline={true}
                                    minDate={new Date()}
                                    
                                />
                            </div>
                            <div style={styles.movieSelectContainer}>
                                <p style={styles.titleText}>
                                    {"Time"}
                                </p>
                                <select onChange={(val) => selectTime(val)} style={styles.selectStyle}>
                                    <option value="-1">-- Time --</option>
                                    <option value="0">Time 1</option>
                                    <option value="1">Time 2</option>
                                    <option value="2">Time 3</option>
                                </select>
                            </div>
                        </div>
                        <div style={styles.hallSection}>
                            <h2 style={styles.h2Style}>Hall 2</h2>
                            <h3 style={styles.h3Style}>Night</h3>
                            <div style={styles.movieSelectContainer}>
                                <p style={styles.titleText}>
                                    {"Movie"}
                                </p>
                                <select onChange={(val) => selectMovie(val)} style={styles.selectStyle}>
                                    <option value="-1">-- Movies --</option>
                                    <option value="0">Movie 1</option>
                                    <option value="1">Movie 2</option>
                                    <option value="2">Movie 3</option>
                                </select>
                            </div>
                            <div style={styles.movieSelectContainer}>
                                <p style={styles.titleText}>{"Date"}
                                
                                </p>
                                <input ref={inputRef2N} type="text" style={styles.selectStyle} disabled/>
                            </div>
                            <div style={{ padding: "15px"}}>
                                <DatePicker
                                    selected={selectedDate2N}
                                    onChange={(date) => pickDateHall2N(date)}
                                    dateFormat="dd/MM/yyyy"
                                    inline={true}
                                    minDate={new Date()}
                                    
                                />
                            </div>
                            <div style={styles.movieSelectContainer}>
                                <p style={styles.titleText}>
                                    {"Time"}
                                </p>
                                <select onChange={(val) => selectTime(val)} style={styles.selectStyle}>
                                    <option value="-1">-- Time --</option>
                                    <option value="0">Time 1</option>
                                    <option value="1">Time 2</option>
                                    <option value="2">Time 3</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

const styles = {
    container:{
      backgroundColor: "#272320",
    },
    
    hallsContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    hallRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    hallSection: {
        display: "flex",
        flex: 1,
        padding: '1rem',
        backgroundColor: '#4C453C',
        borderRadius: '10px',
        margin: '0.5rem',
        flexDirection: 'column',
        justifyContent: "center"
    },
    movieSelectContainer: {
        display: "flex",
        alignItems: "center",
        marginTop: "10px"
    },
    titleText: {
        color: "white",
        flex: 1
    },
    selectStyle: {
        //backgroundColor: "#4C453C",
        //color: "white",
        textAlign: "center",
        //fontWeight: "bold",
        padding: "5px",
        //borderRadius: "10px",
        flex: 3
    },
    datePickerInput: {
        backgroundColor: "white",
        color: "black",
        fontWeight: "bold",
        padding: "10px",
        borderRadius: "10px",
        textAlign: "center",
        border: "none",
        cursor: "pointer",
    },
    h2Style: {
        color: "#AC8B54",
        fontSize: "4rem",
        lineHeight: "63px",
        margin: "0",
    },
    h3Style: {
        color: "#F3E9D2",
        fontSize: "1.5rem",
        lineHeight: "24px",
        margin: "0",
    },
}

export default AdminTab2;