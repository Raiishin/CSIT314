import {React, useState, useRef} from 'react';
import MgmtNavbar from './MgmtNavbar';
import "../assets/css/app.css";
import DataTable from 'react-data-table-component';

var data = [
    {
        customerID: '#202020',
        cinema: 'Suntec CA',
        cinemaRating: '5',
        cinemaReview: 'Cinema was clean and staff was great'
    },
    {
        customerID: '#920312',
        cinema: 'Suntec CA',
        cinemaRating: '5',
        cinemaReview: 'Cinema was clean and staff was great'
    },
]

function MgmtReport(){
    const [entries, setEntries] = useState(10);
    const [stateData, setData] = useState(data);
    const [searchData, setSearchData] = useState(data);
    const [searchResult, setSearchResult] = useState([]);
    const [search, setSearch] = useState("");

    function onSearch(search){
        setSearch(search)
        var searchArray = [];
        if(search){
            var searchArray = [];
            for(var i=0;i<searchData.length;i++){
                if(searchData[i].customerID.includes(search)){
                    searchArray.push(searchData[i]);
                }
            }
            setData(searchArray)
        }else{
            setData(data)
        }
    }

    const columns = [
        {
            name: 'Customer ID',
            selector: row => row.customerID,
        },
        {
            name: 'Cinema',
            selector: row => row.cinema,
        },
        {
            name: 'Cinema Rating',
            selector: row => row.cinemaRating,
            sortable: true,
        },
        {
            name: 'Cinema Review',
            selector: row => row.cinemaReview,
        },
    ];
    
    return(
        <div style={styles.container}>
            <MgmtNavbar currentIndex="mgmt-home" />
            <div style={styles.buttonContainer}>
                <div style={styles.entrySearchContainer}>
                    <div style={styles.showEntryContainer}>
                        <label>Show</label>
                        <select style={styles.fieldStyles} value={entries} onChange={(e) => setEntries(e.target.value)}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                        <label>entries</label>
                    </div>
                    <div style={styles.searchContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    <input className="searchField" style={styles.searchFieldStyles} type="text" value={search} onChange={(e) => onSearch(e.target.value)} placeholder='Search'/>
                    </div>
                </div>
                <div style={styles.generateButtonContainer}>
                    <button style={styles.generateButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                        </svg>
                        <span style={styles.generateButtonText}>Generate Cinema Review Report</span>
                    </button>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={stateData}
                customStyles={tableStyle}
            />
        </div>
    );
}

const styles = {
    container:{
      backgroundColor: "#272320",
      height: "100vh"
    },
    tableContainer: {
        backgroundColor: "grey",
        color: "white",
        padding: "1rem"
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
        padding: "10px",
        color: "white",
        alignItems: "center"
    },
    showEntryContainer: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    entrySearchContainer: {
        flex: 1,
        display: "flex",
        alignItems: "center"
    },
    searchContainer:{
        display: "flex",
        alignItems: "center",
        borderRadius: "10px",
        border: "1px solid white",
        color: "white",
        backgroundColor: "#272320",
        padding: "5px",
        paddingLeft: "15px",
        flex: 2,
    },
    generateButtonContainer: {
        flex: 1,
        display: "flex",
        justifyContent: "flex-end",
    },
    generateButton: {
        backgroundColor: "#A9A18E",
        borderRadius:"10px",
        padding: "6px 10px",
        display: "flex",
        alignItems: "center",
    },
    generateButtonText: {
        marginLeft: "5px"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    pageButton: {
        margin: "0 10px",
    },
    evenRow: {
        backgroundColor: "grey",
    },
    oddRow: {
        backgroundColor: "brown",
    },
    fieldStyles: {
        borderRadius: "10px",
        backgroundColor: "#4C453C",
        padding: "6px",
        margin: "0 10px",
    },
    searchFieldStyles: {
        flex: 1,
        color: "white",
        backgroundColor: "#272320",
        border: "none",
        paddingLeft: "10px"
    },
}

const tableStyle={
    rows: {
        style: {
            minHeight: '72px', // override the row height
        },
    },
}

export default MgmtReport;
