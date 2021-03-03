import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RecentStats from './RecentStats';

export default function DateRange({playerArray}){
    const [startDate, setStartDate] = useState( null );
    const [endDate, setEndDate] = useState( null );

    useEffect( ()=> {
      if(startDate > endDate){
        setEndDate(null)
      }

    }, [startDate, endDate])

    
    if( startDate && endDate){
        return (
          <>
            <form id="date-picker">
            <div>Start date</div>
            <DatePicker
              selected={startDate}
              onChange={date => setStartDate( date )}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            //set min Date to start of 2020-21 season (Dec 22, 2020)
              minDate={new Date(2020, 11, 22)}
              maxDate={new Date()}
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
            </form>
      <RecentStats playerArray={playerArray} start_date={startDate} end_date={endDate} />
          </>
        );
        }


    else{
    return (
      <form id="date-picker">
      <div>Start date</div>
        <DatePicker
          placeholderText="MM-DD-YYYY"
          selected={startDate}
          onChange={date => setStartDate( date )}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          //set min Date to start of 2020-21 season (Dec 22, 2020)         
          minDate={new Date(2020, 11, 22)}
          maxDate={new Date()}
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
      </form>
    );
  }

  }