import React, { useState } from 'react';
import RecentStats from './RecentStats';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function DateRange({player}){
    const [startDate, setStartDate] = useState( null );
    const [endDate, setEndDate] = useState( new Date());


    return (
      <>
        <div>Start date</div>
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={startDate}
          onChange={date => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <div>End date</div>
        <DatePicker
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date() }
          minDate={startDate}
        />
  <RecentStats player={player} start_date={startDate} end_date={endDate} />
      </>
    );
  };