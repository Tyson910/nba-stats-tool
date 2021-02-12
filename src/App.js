
import './App.css';
import PlayerSearch from './PlayerSearch'

import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"

const DateRange = () => {
  const [startDate, setStartDate] = useState( null );
  const [endDate, setEndDate] = useState( new Date());
  return (
    <>
      <div>Start date</div>
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <div>End date</div>
      <DatePicker
        selected={endDate}
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        maxDate={new Date() }
        minDate={startDate}
      />
      <PlayerSearch />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Hey</div>
        <DateRange />
      </header>
    </div>
  );
}

export default App;
