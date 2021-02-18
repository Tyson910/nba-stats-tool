import React, { useState } from 'react';
import RecentStats from './RecentStats';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function DateRange({playerArray}){
    const [startDate, setStartDate] = useState( null );
    const [endDate, setEndDate] = useState( null );
if( startDate && endDate){
    return (
      <>
        <div>Start date</div>
        <DatePicker
          selected={startDate}
          onChange={date => setStartDate( date )}
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
  {playerArray.map( (player) => <RecentStats key={player + startDate} player={player} start_date={startDate} end_date={endDate} /> )}
      </>
    );
    }
    else{
    return (
      <>
        <div>Start date</div>
        <DatePicker
          placeholderText="MM-DD-YYYY"
          selected={startDate}
          onChange={date => setStartDate( date )}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <div>End date</div>
        <DatePicker
          placeholderText="MM-DD-YYYY"
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          maxDate={new Date() }
          minDate={startDate}
        />
      </>
    );
  }

  }