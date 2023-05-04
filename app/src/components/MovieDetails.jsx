import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../api/movies.js';

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const params = useParams();
  const [selectedTiming, setSelectedTiming] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    setSelectedTiming('');
  };
  const handleTimingChange = (event) => {
    setSelectedTiming(event.target.value);
  };
  
  const locations = ["New York", "Los Angeles", "Chicago", "Houston"];
  const timings = [
    { time: "2:00 PM", available: true },
    { time: "4:00 PM", available: false },
    { time: "6:00 PM", available: true },
    { time: "8:00 PM", available: true },
  ];

  useEffect(() => {
    const retrieveMovie = async () => {
      const data = await getMovie(params.id);
      setMovie(data);
    };
    if (typeof params !== 'undefined') {
      retrieveMovie();
    }
  }, []);
  return (
    <div className="bg-gray-800 min-h-screen py-12 md:py-20 px-4 md:px-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        <div className="md:w-1/3 lg:w-2/5 mb-8 md:mb-0">
          <img
            src={movie.image}
            width={250}
            height={250}
            className="rounded-lg shadow-lg"
            alt="Movie poster"
          />
        </div>
        <div className="md:w-2/3 lg:w-3/5 md:pl-8">
          <h1 className="text-white text-4xl font-bold mb-4">{movie.title}</h1>
          <div className="text-gray-400 leading-relaxed mb-8">
            <div className="flex flex-wrap mb-4">
              <h2 className="text-lg font-medium mr-2">Genres:</h2>
              <ul>
                {/* <li className="inline-block text-gray-400 mr-2 mb-2">Actor 1</li> */}
                {movie.genres !== [] && typeof movie.genres !== "undefined" && movie.genres.split(",").map(genre => {
                  return (
                    <li className="inline-block bg-gray-700 rounded-full py-1 px-3 text-sm font-medium text-gray-400 mr-2 mb-2">
                      {genre}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="flex flex-wrap mb-4">
              <h2 className="text-lg font-medium mr-2">Cast:</h2>
              <ul>
                <li className="inline-block text-gray-400 mr-2 mb-2">{movie.stars}</li>
              </ul>
            </div>
            <div className="flex flex-wrap mb-4">
              <h2 className="text-lg font-medium mr-2">Director:</h2>
              <p className="text-gray-400">{movie.directors}</p>
            </div>
            <h2 className="text-lg font-medium mt-8 mb-2">Sypnosis</h2>
            <p>{movie.plot}</p>
          </div>
        </div>
      </div>
      <div className="w-1/3">
        <div className="border border-gray-400 rounded-lg p-4">
          <h3 className="text-white font-bold mb-2">Movie Timings</h3>
          <div className="mb-4">
            <select
              className="border border-gray-400 p-2 w-full"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              <option value="">Select a location</option>
              {locations.map((location) => (
                <option value={location} key={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          {selectedLocation && (
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Timings at {selectedLocation}
              </h4>
              <ul>
                {timings.map((timing) => (
                  <li key={timing}>{timing.time}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="mb-8">
          <h2 className="text-white font-bold mb-2">Customer Reviews</h2>
          <div className="flex mb-4">
            <img
              className="w-12 h-12 object-cover rounded-full mr-4"
              src="https://via.placeholder.com/150"
              alt="Customer Review"
            />
            <div className="ml-4">
              <h3 className="text-white font-semibold">Customer Name</h3>
              <p className="text-gray-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque eu ipsum a quam commodo euismod vitae id massa.
                Sed vitae sapien lectus. Praesent sagittis, nisl ac lacinia
                iaculis, enim tellus tempor libero, a commodo dui sapien sit
                amet nibh. Duis sed purus vitae odio suscipit feugiat at ac
                quam. Aliquam erat volutpat. Praesent gravida commodo tortor,
                sit amet consectetur enim. Aliquam a lectus vel nunc commodo
                lobortis non non purus. Donec maximus efficitur lacus, eu
                aliquet tellus. Pellentesque in aliquet justo. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere
                cubilia curae; Suspendisse accumsan dui eget arcu volutpat
                aliquet. Praesent eu libero at purus malesuada tincidunt.
              </p>
            </div>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque eu ipsum a quam commodo euismod vitae id massa.
                Sed vitae sapien lectus. Praesent sagittis, nisl ac lacinia
                iaculis, enim tellus tempor libero, a commodo dui sapien sit
                amet nibh. Duis sed purus vitae odio suscipit feugiat at ac
                quam. Aliquam erat volutpat. Praesent gravida commodo tortor,
                sit amet consectetur enim. Aliquam a lectus vel nunc commodo
                lobortis non non purus. Donec maximus efficitur lacus, eu
                aliquet tellus. Pellentesque in aliquet justo. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere
                cubilia curae; Suspendisse accumsan dui eget arcu volutpat
                aliquet. Praesent eu libero at purus malesuada tincidunt.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque eu ipsum a quam commodo euismod vitae id massa.
                Sed vitae sapien lectus. Praesent sagittis, nisl ac lacinia
                iaculis, enim tellus tempor libero, a commodo dui sapien sit
                amet nibh. Duis sed purus vitae odio suscipit feugiat at ac
                quam. Aliquam erat volutpat. Praesent gravida commodo tortor,
                sit amet consectetur enim. Aliquam a lectus vel nunc commodo
                lobortis non non purus. Donec maximus efficitur lacus, eu
                aliquet tellus. Pellentesque in aliquet justo. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere
                cubilia curae; Suspendisse accumsan dui eget arcu volutpat
                aliquet. Praesent eu libero at purus malesuada tincidunt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
