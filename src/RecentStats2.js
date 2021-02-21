import React, {useState, useEffect, useRef} from 'react';

export default function RecentStats2({playerArray, start_date, end_date}){

const prevPlayerArray = usePrevious(playerArray);

function usePrevious(value) {
    const ref = useRef([]);
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  //create startDatePretty and startDateAPI
    //returns date in 'YYYY-MM-DD' numerical format for API reference
    function createAPIDate( uglyDate ){
                                                //Jan == 1; Feb==2 in API   
        return uglyDate.getFullYear() +  '-' + ( uglyDate.getMonth() + 1 ) + '-' + uglyDate.getDate();
    }


    const [statsArray, setStatsArray] = useState([ ]);
    const [loading, setLoading] = useState(false);

    //fetches player info then adds it to state
    async function fetchStats(playerID){
        setLoading(true);
        var API = `https://www.balldontlie.io/api/v1/stats/?start_date=${createAPIDate(start_date)}&end_date=${createAPIDate(end_date)}&player_ids[]=`;
        //let playerID = player.split("-")[0];
        let response = await fetch(API + playerID);
        let resultObj = await response.json();
        var dataArray = resultObj.data;
        //sorts games by date in ascending order
        let sortedStats = dataArray.sort( (a,b) => new Date(a.game.date) - new Date(b.game.date) )
        setStatsArray( oldStatsArray => [...oldStatsArray, sortedStats ]  ); 
        setLoading(false);  
    }


    useEffect(() => {
        if( playerArray.length > prevPlayerArray.length ){
            const [newestPlayer] = playerArray.slice(-1);
            fetchStats(newestPlayer);
        }
    }, [playerArray] );


    return <div>Hey</div>



/*

        if(loading){
            return <div>Loading</div>

        }
        else if( stats ){
            return (
                <RecentStatsTable statsArray={stats} 
                first_name={player.split("-")[1]} last_name={player.split("-")[2]}
                start_date = {createPrettyDate(start_date)} end_date = {createPrettyDate(end_date)} />
            )
        }
        else{
            return <div>Hey</div>

        }
        */
}