import { React, useState } from 'react';

import dnd from '../assets/img/dnd.jpg';
import gotg from '../assets/img/gotg.jpg';
import smb from '../assets/img/smb.jpg';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Staffweb() {
  const [isQuickBuy, setisQuickBuy] = useState(true);
  const [cinema, setCinema] = useState(null);
  const [time, setTime] = useState(null);
  const [movie, setMovie] = useState(null);
  const [isAutoPlay, setisAutoPlay] = useState(true);
  const [selectedItem, setselectedItem] = useState(0);

  function toggleQuickBuy(status) {
    setisQuickBuy(status);
  }

  function changeCinema(e) {
    setCinema(e.target.value);
  }

  function changeMovie(e) {
    setMovie(e.target.value);
    setisAutoPlay(false);
    setselectedItem(parseInt(e.target.value));
  }

  function changeTime(e) {
    setTime(e.target.value);
  }

  function resetSelections() {
    setCinema(null);
    setMovie(null);
    setTime(null);
    setisAutoPlay(true);
    setselectedItem(0);
  }

  var quickBuyContent, checkPurchaseContent;

  if (isQuickBuy) {
    quickBuyContent = (
      <>
        <div style={styles.quickBuySubContainter}>
          <p style={styles.quickBuyTitle}>Select a Cinema</p>
          <select onChange={val => changeCinema(val)} style={styles.selectStyle}>
            <option value="-1">-- Cinemas --</option>
            <option value="0">Golden Village City Square</option>
            <option value="1">Golden Village Plaza</option>
            <option value="2">Golden Village VivoCity</option>
          </select>
        </div>
        <div style={styles.quickBuySubContainter}>
          <p style={styles.quickBuyTitle}>Select a Movie</p>
          <select
            onChange={val => changeMovie(val)}
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
            onChange={val => changeTime(val)}
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
          <p>Enter Customer Email/Mobile No</p>
          <select>
            <option></option>
            <option></option>
            <option></option>
          </select>
        </div>
      </>
    );
  }
  return (
    <div style={styles.container}>
      <div style={styles.topContainer}>
        <div style={styles.buyCheckContainer}>
          <div style={styles.buyCheckButtonContainer}>
            <button
              onClick={() => toggleQuickBuy(true)}
              style={isQuickBuy ? styles.buyCheckButtonActive : styles.buyCheckButton}>
              {'Quick Buy'}
            </button>
            <button
              onClick={() => toggleQuickBuy(false)}
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
          <Carousel
            autoPlay={isAutoPlay}
            selectedItem={selectedItem}
            infiniteLoop={true}
            showThumbs={false}>
            <div>
              <img style={styles.carouselImage} src={gotg} />
            </div>
            <div>
              <img style={styles.carouselImage} src={dnd} />
            </div>
            <div>
              <img style={styles.carouselImage} src={smb} />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

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
  carouselImage: {
    objectFit: 'cover',
    height: '400px',
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

export default Staffweb;
