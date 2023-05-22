import MovieCard from '../components/MovieCard';
import React, { useEffect, useState } from 'react';

import MainCarousel from './Carousel';
import CheckPurchase from './checkPurchase';

import { getMovies } from '../api/movies';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const retrieveMovies = async () => {
      if (movies.length === 0) {
        const { moviesData } = await getMovies();
        setMovies(moviesData);
      }
    };

    retrieveMovies();
  }, [getMovies, setMovies]);

  const [isQuickBuy, setIsQuickBuy] = useState(true);
  const [cinema, setCinema] = useState(null);
  const [time, setTime] = useState(null);
  const [movie, setMovie] = useState(null);
  const [selectedItem, setSelectedItem] = useState(0);

  const resetSelections = () => {
    setCinema(null);
    setMovie(null);
    setTime(null);
    setSelectedItem(0);
  };

  var quickBuyContent, checkPurchaseContent;

  if (isQuickBuy) {
    quickBuyContent = (
      <>
        <div style={styles.quickBuySubContainter}>
          <p style={styles.quickBuyTitle}>Select a Cinema</p>
          <select onChange={e => setCinema(e.target.value)} style={styles.selectStyle}>
            <option value="-1">-- Cinemas --</option>
            <option value="0">Golden Village City Square</option>
            <option value="1">Golden Village Plaza</option>
            <option value="2">Golden Village VivoCity</option>
          </select>
        </div>
        <div style={styles.quickBuySubContainter}>
          <p style={styles.quickBuyTitle}>Select a Movie</p>
          <select
            onChange={e => {
              setMovie(e.target.value);
              setSelectedItem(parseInt(e.target.value));
            }}
            disabled={cinema ? null : 'disabled'}
            style={styles.selectStyle}>
            <option value="-1">-- Movies --</option>
            <option value="0">Guardians of the Galaxy Vol. 3</option>
            <option value="1">Dungeons & Dragons: Honour Among Thieves</option>
            <option value="2">Super Mario Bruhh</option>
          </select>
        </div>
        <div style={styles.quickBuySubContainter}>
          <p style={styles.quickBuyTitle}>Select Time</p>
          <select
            onChange={e => setTime(e.target.value)}
            disabled={movie ? null : 'disabled'}
            style={styles.selectStyle}>
            <option value="-1">-- Time --</option>
            <option value="19:00">19:00</option>
            <option value="21:00">21:00</option>
            <option value="22:30">22:30</option>
          </select>
        </div>
        <div style={styles.quickBuyButtonContainer}>
          <div style={{ flex: 1 }} />
          <button onClick={resetSelections} style={styles.quickBuyButtonLight}>
            {'Reset'}
          </button>
          <button style={styles.quickBuyButtonBlue}>{'Go'}</button>
          <div style={{ flex: 1 }} />
        </div>
      </>
    );
  } else {
    checkPurchaseContent = (
      <>
        <div>
          <CheckPurchase></CheckPurchase>
        </div>
      </>
    );
  }

  return (
    <div className="bg-dark-brown">
      <div style={styles.container}>
        <div style={styles.topContainer}>
          <div style={styles.buyCheckContainer}>
            <div style={styles.buyCheckButtonContainer}>
              <button
                onClick={() => setIsQuickBuy(true)}
                style={isQuickBuy ? styles.buyCheckButtonActive : styles.buyCheckButton}>
                {'Quick Buy'}
              </button>
              <button
                onClick={() => setIsQuickBuy(false)}
                style={!isQuickBuy ? styles.buyCheckButtonActive : styles.buyCheckButton}>
                {'Check Purchase'}
              </button>
            </div>
            <div style={styles.quickBuyContainter}>
              {quickBuyContent}
              {checkPurchaseContent}
            </div>
          </div>
          <div style={styles.buyCheckImageContainer}>
            <MainCarousel />
          </div>
        </div>
      </div>
      <div className="text-center bg-dark-brown">
        <body className="grid grid-cols-6">
          {movies.length > 0 &&
            movies.map(movie => (
              <div className="">
                <button>
                  <MovieCard data={movie} />
                </button>
              </div>
            ))}
        </body>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#272320'
  },
  topContainer: {
    display: 'flex',
    padding: '2rem',
    justifyContent: 'stretch'
  },
  buyCheckContainer: {
    flex: 1,
    padding: '0 15px'
  },
  buyCheckImageContainer: {
    alignSelf: 'stretch',
    flex: 3,
    padding: '0 15px'
  },
  buyCheckButtonContainer: {
    display: 'flex'
  },
  buyCheckButtonActive: {
    padding: '2rem',
    backgroundColor: '#AC8B54',
    flex: 1,
    color: 'white',
    fontWeight: 'bold'
  },
  buyCheckButton: {
    flex: 1,
    padding: '2rem',
    backgroundColor: '#4E4B41',
    color: 'white',
    fontWeight: 'bold'
  },
  quickBuyContainter: {
    display: 'flex',
    flexDirection: 'column'
  },
  quickBuySubContainter: {
    display: 'flex',
    flexDirection: 'column'
  },
  quickBuyTitle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left'
  },
  selectStyle: {
    backgroundColor: '#4C453C',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: '10px',
    borderRadius: '10px'
  },
  quickBuyButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    //justifyContent: "space-around",
    marginTop: '15px'
  },
  quickBuyButtonLight: {
    padding: '10px 20px',
    borderRadius: '10px',
    flex: 1,
    color: 'white',
    backgroundColor: '#A9A18E',
    marginRight: '5px'
  },
  quickBuyButtonBlue: {
    padding: '10px 20px',
    borderRadius: '10px',
    flex: 1,
    color: 'white',
    backgroundColor: '#012E41',
    marginLeft: '5px'
  }
};

export default Home;
