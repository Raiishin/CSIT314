import React from 'react';

const SeatingPlanForm = ({
  onDateSelection,
  onTimeSelection,
  onTheaterSelection,
  onViewSeatingPlanClick
}) => {
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedTime, setSelectedTime] = React.useState('');
  const [selectedTheater, setSelectedTheater] = React.useState('');

  const handleDateSelection = event => {
    const date = event.target.value;
    setSelectedDate(date);
    onDateSelection(date);
  };

  const handleTimeSelection = event => {
    const time = event.target.value;
    setSelectedTime(time);
    onTimeSelection(time);
  };

  const handleTheaterSelection = event => {
    const theater = event.target.value;
    setSelectedTheater(theater);
    onTheaterSelection(theater);
  };

  return (
    <>
      <div>
        <p className="text-gray-600 font-bold">Date</p>
        <select
          id="date"
          name="date"
          value={selectedDate}
          onChange={e => handleDateSelection(e.target.value)}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select a date</option>
          <option value="2023-05-24">May 24, 2023</option>
          <option value="2023-05-25">May 25, 2023</option>
          <option value="2023-05-26">May 26, 2023</option>
          <option value="2023-05-27">May 27, 2023</option>
        </select>
        <p className="text-gray-600 font-bold">Time</p>
        <select
          id="time"
          name="time"
          value={selectedTime}
          onChange={e => handleTimeSelection(e.target.value)}
          disabled={!selectedDate}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select a time</option>
          <option value="08:00 PM">8:00 PM</option>
          <option value="09:00 PM">9:00 PM</option>
          <option value="10:00 PM">10:00 PM</option>
        </select>
        <p className="text-gray-600 font-bold">Theater</p>
        <select
          id="theater"
          name="theater"
          value={selectedTheater}
          onChange={e => handleTheaterSelection(e.target.value)}
          disabled={!selectedTime}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select a theater</option>
          <option value="Theater 1">Theater 1</option>
          <option value="Theater 2">Theater 2</option>
          <option value="Theater 3">Theater 3</option>
        </select>
        <div>
          <button
            className="bg-gray-200 text-white font-bold py-2 px-4 rounded mt-8 enabled:bg-cyan-600"
            disabled={!selectedDate || !selectedTheater || !selectedTime}
            onClick={onViewSeatingPlanClick}>
            View Seating Plan
          </button>
        </div>
      </div>
    </>
  );
};

export default SeatingPlanForm;
