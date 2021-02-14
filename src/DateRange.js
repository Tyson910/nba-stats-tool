import React, { useState } from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function DateRange(){
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
  
      </>
    );
  };