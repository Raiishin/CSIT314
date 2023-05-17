import React, { useEffect, useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { getCinemas, getCinemaHalls, getTimeslots, saveShowtimes } from '../api/management.js';
import { getMovies } from '../api/movies';

import Button from './Button';

import 'react-datepicker/dist/react-datepicker.css';
import '../assets/css/app.css';

const ManageMovies = () => {
  const inputRef = useRef(null);
  const [cinemas, setCinemas] = useState([]);
  const [cinemaHalls, setCinemaHalls] = useState([]);
  const [timeslots, setTimeslots] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const initializePageData = async () => {
      const { cinemasData } = await getCinemas();
      setCinemas(cinemasData.map(cinema => cinema.name));

      const { cinemaHallsData } = await getCinemaHalls();
      setCinemaHalls(cinemaHallsData.map(cinemaHall => cinemaHall.hall));

      const { timeslotsData } = await getTimeslots();
      setTimeslots(timeslotsData.map(timeslot => `${timeslot.startTime} to ${timeslot.endTime}`));

      const { moviesData } = await getMovies();
      setMovies(moviesData);
    };

    initializePageData();
  }, []);

  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHall, setSelectedHall] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedTimeslot, setSelectedTimeslot] = useState(null);

  const selectDate = date => {
    setSelectedDate(date);

    const formatedDate = new Date(date);
    const formatedDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const formatedMonth = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    inputRef.current.value =
      formatedDays[formatedDate.getDay()] +
      ', ' +
      formatedDate.getDate() +
      ' ' +
      formatedMonth[formatedDate.getMonth()] +
      ' ' +
      formatedDate.getFullYear();
  };

  const onSave = async () => {
    // Call api on the backend to save the movie datetime
    const response = await saveShowtimes(
      selectedCinema,
      selectedHall,
      selectedMovieId,
      selectedTimeslot,
      selectedDate
    );

    if (response.id) {
      return alert('Successfully saved');
    } else {
      return alert(response.message);
    }
  };

  return (
    <div className="bg-dark-brown">
      <div className="flex justify-start ml-[20px]">
        {cinemas !== [] &&
          cinemas.map((cinema, i) => {
            return (
              <button
                style={selectedCinema == cinema ? styles.activeCinemabutton : styles.cinemabutton}
                onClick={() => setSelectedCinema(cinema)}>
                {cinema}
              </button>
            );
          })}
      </div>
      <div className="flex flex-col items-center">
        <div className="w-2/3">
          <div className="flex flex-col justify-center bg-light-brown p-1 m-1 rounded-lg">
            <div className="flex items-center mt-[10px]">
              <p style={styles.titleText}>{'Hall'}</p>
              <select onChange={e => setSelectedHall(e.target.value)} style={styles.selectStyle}>
                {cinemaHalls !== [] &&
                  cinemaHalls.map((cinemaHall, index) => (
                    <option value={cinemaHall}>{cinemaHall}</option>
                  ))}
              </select>
            </div>

            <div className="flex items-center mt-[10px]">
              <p style={styles.titleText}>{'Movie'}</p>
              <select onChange={e => setSelectedMovieId(e.target.value)} style={styles.selectStyle}>
                {movies !== [] &&
                  movies.map((movie, index) => <option value={movie.id}>{movie.title}</option>)}
              </select>
            </div>

            <div className="flex items-center mt-[10px]">
              <p style={styles.titleText}>{'Date'}</p>
              <input ref={inputRef} type="text" style={styles.selectStyle} disabled />
            </div>

            <div className="p-2">
              <DatePicker
                selected={selectedDate}
                onChange={date => selectDate(date)}
                dateFormat="dd/MM/yyyy"
                inline={true}
                minDate={new Date()}
              />
            </div>

            <div className="flex items-center mt-[10px]">
              <p style={styles.titleText}>{'Time'}</p>
              <select
                onChange={e => setSelectedTimeslot(e.target.value)}
                style={styles.selectStyle}>
                {timeslots.map((timeslot, index) => (
                  <option value={`${timeslot}`}>{timeslot}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <Button text={'save'} className="bg-yellow-300 rounded-lg m-2 p-2" onClick={onSave} />
      </div>
    </div>
  );
};

const styles = {
  cinemabutton: {
    padding: '1rem',
    backgroundColor: '#442C2C',
    color: 'white',
    fontWeight: 'bold',
    marginRight: '1px',
    alignSelf: 'flex-start',
    border: '1px solid black'
  },
  activeCinemabutton: {
    padding: '1rem',
    backgroundColor: '#442C2C',
    color: '#BD8B39',
    fontWeight: 'bold',
    marginRight: '1px',
    alignSelf: 'flex-start',
    border: '1px solid black'
  },

  hallRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  titleText: {
    color: 'white',
    flex: 1
  },
  selectStyle: {
    textAlign: 'center',
    padding: '5px',
    flex: 3
  },
  h2Style: {
    color: '#AC8B54',
    fontSize: '4rem',
    lineHeight: '63px',
    margin: '0'
  },
  h3Style: {
    color: '#F3E9D2',
    fontSize: '1.5rem',
    lineHeight: '24px',
    margin: '0'
  }
};

export default ManageMovies;
