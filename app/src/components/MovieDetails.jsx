import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie, getReview, getMovieShowtimes } from '../api/movies.js';
import { getCinemas } from '../api/management.js';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [review, setReview] = useState({});
  const params = useParams();
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState('');

  const [dates, setDates] = useState([]);
  const [allTimings, setAllTimings] = useState([]);

  const [selectedDate, setSelectedDate] = useState('');
  const [timings, setTimings] = useState([]);

  const [selectedTiming, setSelectedTiming] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const initializePageData = async () => {
      const { cinemasData } = await getCinemas();
      setCinemas(cinemasData.map(cinema => cinema.name));

      const movieData = await getMovie(params.id);
      setMovie(movieData);
    };

    initializePageData();
  }, []);

  useEffect(() => {
    if (selectedDate !== '' && allTimings !== []) {
      const index = dates.indexOf(selectedDate);
      setTimings(allTimings[index]);
    }
  }, [selectedDate]);

  useEffect(() => {
    const getMovieShowtimesData = async () => {
      if (selectedCinema !== '') {
        const movieShowtimes = await getMovieShowtimes(params.id, selectedCinema);

        if (movieShowtimes.message) {
          alert(movieShowtimes.message);
          setDates([]);
          setAllTimings([]);
          setTimings([]);
          setSelectedDate('');
        } else {
          setDates(movieShowtimes.dates);
          setAllTimings(movieShowtimes.timings);
        }
      }
    };

    getMovieShowtimesData();
  }, [selectedCinema]);

  // TODO :: Reviews
  useEffect(() => {
    const retrieveReview = async () => {
      console.log(dataReview);
      const dataReview = await getReview(params.id);
      setReview(dataReview);
    };

    if (typeof params !== 'undefined') {
      retrieveReview();
    }
  }, []);

  return (
    <div className="bg-dark-brown mt-4">
      <div className="flex flex-row ">
        <div className="m-4 justify-center flex flex-col basis-1/3">
          <img
            src={movie.image}
            width={300}
            height={300}
            className="rounded-lg shadow-lg m-4 self-center"
            alt="Movie poster"
          />
          <div className="w-full m-4">
            <div className="border border-gray-400 rounded-lg p-4">
              <h3 className="text-white font-bold mb-2">Movie Timings</h3>
              <div className="mb-4">
                <select
                  className="border border-gray-400 p-2 w-full"
                  value={selectedCinema}
                  onChange={e => {
                    setSelectedCinema(e.target.value);
                  }}
                >
                  <option value="">Select a Cinema</option>
                  {cinemas.map(cinema => (
                    <option value={cinema} key={cinema}>
                      {cinema}
                    </option>
                  ))}
                </select>
              </div>

              {dates.length !== 0 && (
                <div>
                  <h3 className="text-white font-bold mb-2">Available Dates</h3>
                  <div className="mb-4">
                    <select
                      className="border border-gray-400 p-2 w-full"
                      value={selectedDate}
                      onChange={e => setSelectedDate(e.target.value)}
                      disabled={dates === []}
                    >
                      <option value="">Select a Date</option>
                      {dates.map(date => (
                        <option value={date} key={date}>
                          {date}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {selectedDate !== '' && (
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">Select a timeslot</h4>
                  <div className="flex flex-col ">
                    {timings.map(timing => (
                      <Button
                        className={'bg-white m-1 p-1 rounded-lg w-1/2 self-center'}
                        text={timing.showtime}
                        onClick={() => {
                          navigate(`/tickets/${timing.id}`);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="m-4 basis-2/3">
          {movie !== {} && (
            <div>
              <h1 className="text-white text-4xl font-bold mb-4 underline">{movie.title}</h1>
              <div className="text-gray-300 leading-relaxed mb-8">
                <div className="flex flex-wrap mb-4">
                  <h2 className="text-lg font-medium mr-2">Genres:</h2>
                  <ul>
                    {movie.genres &&
                      movie.genres.split(',').map(genre => {
                        return (
                          <li className="inline-block bg-gray-700 rounded-full py-1 px-3 text-sm font-medium text-gray-400 mr-2 mb-2">
                            {genre}
                          </li>
                        );
                      })}
                  </ul>
                </div>
                <div className="flex flex-wrap mb-2 items-baseline">
                  <h2 className="text-lg font-medium mr-2">Cast:</h2>
                  <ul>
                    <li className="inline-block text-gray-400 mr-2">{movie.stars}</li>
                  </ul>
                </div>
                <div className="flex flex-wrap mb-4 items-baseline">
                  <h2 className="text-lg font-medium mr-2">Director:</h2>
                  <p className="inline-block text-gray-400">{movie.directors}</p>
                </div>
                <div className="flex flex-wrap mb-4 items-baseline">
                  <h2 className="text-lg font-medium mr-2">Release Date:</h2>
                  <p className="inline-block text-gray-400">{movie.releaseState}</p>
                </div>
                <div className="flex flex-wrap mb-4 items-baseline">
                  <h2 className="text-lg font-medium mr-2">Runtime:</h2>
                  <p className="inline-block text-gray-400">{movie.runtimeStr}</p>
                </div>
                <h2 className="text-lg font-medium mt-8">Sypnosis</h2>
                <p className="inline-block font-medium w-3/4">{movie.plot}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="">
        <h1 className="text-4xl text-white font-bold mb-4 underline">Customer Reviews</h1>
        <div className="flex mt-4">
          <div className="ml-4">
            <h3 className="text-white font-semibold">{review.imDbId}</h3>
            <p className="text-gray-400 text-sm"></p>
          </div>
        </div>
        <div className="flex">
          <img
            className="w-12 h-12 object-cover rounded-full mr-4"
            src="https://via.placeholder.com/150"
            alt="Customer Review"
          />
          <div className="ml-4">
            <h3 className="text-white font-semibold">Customer Name</h3>
            <p className="text-gray-400 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu ipsum a quam
              commodo euismod vitae id massa. Sed vitae sapien lectus. Praesent sagittis, nisl ac
              lacinia iaculis, enim tellus tempor libero, a commodo dui sapien sit amet nibh. Duis
              sed purus vitae odio suscipit feugiat at ac quam. Aliquam erat volutpat. Praesent
              gravida commodo tortor, sit amet consectetur enim. Aliquam a lectus vel nunc commodo
              lobortis non non purus. Donec maximus efficitur lacus, eu aliquet tellus. Pellentesque
              in aliquet justo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
              posuere cubilia curae; Suspendisse accumsan dui eget arcu volutpat aliquet. Praesent
              eu libero at purus malesuada tincidunt.
            </p>
          </div>
          <div className="flex mb-4">
            <img
              className="w-12 h-12 object-cover rounded-full mr-4"
              src="https://via.placeholder.com/150"
              alt="Customer Review"
            />
            <div className="ml-4">
              <h3 className="text-white font-semibold">Customer Name</h3>
              <p className="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu ipsum a
                quam commodo euismod vitae id massa. Sed vitae sapien lectus. Praesent sagittis,
                nisl ac lacinia iaculis, enim tellus tempor libero, a commodo dui sapien sit amet
                nibh. Duis sed purus vitae odio suscipit feugiat at ac quam. Aliquam erat volutpat.
                Praesent gravida commodo tortor, sit amet consectetur enim. Aliquam a lectus vel
                nunc commodo lobortis non non purus. Donec maximus efficitur lacus, eu aliquet
                tellus. Pellentesque in aliquet justo. Vestibulum ante ipsum primis in faucibus orci
                luctus et ultrices posuere cubilia curae; Suspendisse accumsan dui eget arcu
                volutpat aliquet. Praesent eu libero at purus malesuada tincidunt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
