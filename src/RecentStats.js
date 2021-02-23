import React, {useState, useEffect, useRef} from 'react';
import RecentStatsTable from './RecentStatsTable';
import {VictoryLine, VictoryChart, VictoryTheme, VictoryGroup, VictoryScatter} from 'victory';

export default function RecentStats({playerArray, start_date, end_date}){


    const [statsArray, setStatsArray] = useState([ ]);
    const [loading, setLoading] = useState(false);

    //saves prevPlayerArray to know when to fetch/remove stats
    const prevPlayerArray = usePrevious(playerArray);

    function usePrevious(value) {
        const ref = useRef([]);
        useEffect(() => {
        ref.current = value;
        });
        return ref.current;
    }

    //fetches player info then adds it to state
    async function fetchStats(playerID){
        setLoading(true);
        var API = `https://www.balldontlie.io/api/v1/stats/?start_date=${createAPIDate(start_date)}&end_date=${createAPIDate(end_date)}&player_ids[]=`;
        let response = await fetch(API + playerID);
        let resultObj = await response.json();
        var dataArray = resultObj.data;
        //sorts games by date in ascending order
        let sortedStats = dataArray.sort( (a,b) => new Date(a.game.date) - new Date(b.game.date) )
        setStatsArray( oldStatsArray => [...oldStatsArray, sortedStats ]  ); 

        setLoading(false);  
    }

    function filterStats(gamesArray){
        if (playerArray.some( player => player.id === gamesArray[0].player.id) ){
            return gamesArray;
        }
    }
    
  //create startDatePretty and startDateAPI

    //returns date in 'YYYY-MM-DD' numerical format for API reference
    //API saves Jan == 1, Feb ==2 so we add 1 to the get Month function
    function createAPIDate( uglyDate ){ 
        return uglyDate.getFullYear() +  '-' + ( uglyDate.getMonth() + 1 ) + '-' + uglyDate.getDate();
    }

    //returns date in 'Jan 1, 2021' format for table header
    function createPrettyDate( uglyDate ){
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        return months[uglyDate.getMonth()] +  ' ' + uglyDate.getDate() + ', ' + uglyDate.getFullYear();
    }

    useEffect(() => {

        if(!statsArray.length){
            playerArray.map( player => fetchStats(player.id))
        }

        else if( playerArray.length > prevPlayerArray.length ){
            const [newestPlayer] = playerArray.slice(-1);
            fetchStats(newestPlayer.id);
        }

        else if(playerArray.length < prevPlayerArray.length){
            setStatsArray( statsArray.filter( games => filterStats(games) ) ) ;
        }
    
    }, [playerArray] );
 
    if(loading){
        return <div style={{margin: "0 0 20vh 0"}}>Loading</div>

    }
    else if( statsArray.length ){

        return (
            <>
            {statsArray.map( (stats) => <RecentStatsTable statsArray={stats} key={stats[0].player.id}
                first_name={stats[0].player.first_name} last_name={stats[0].player.last_name}
                start_date = {createPrettyDate(start_date)} end_date = {createPrettyDate(end_date)} />
            )}


<div id="VictoryContainer">

<VictoryChart theme={VictoryTheme.grayscale} id="VictoryContainer"
        domainPadding={15}   >

<VictoryGroup
  colorScale={"qualitative"}>

                <VictoryLine
                y={(d) => d.reb}
                x={(d) => new Date( d.game.date)}
                    style={{ parent: { border: "1px solid #ccc"} }}
                    data={statsArray[0]}
                />
                
        <VictoryLine
            interpolation="cardinal"
            y={"ast"}
            x={(d) => new Date( d.game.date)}
                style={{ parent: { border: "1px solid #ccc"}  }}
                data={statsArray[0]}
            />

                <VictoryScatter
                    size={1.5}
                    data={statsArray[0]}
                    y={"ast"}
                    x={(d) => new Date( d.game.date)}
                />

        </VictoryGroup>
        </VictoryChart>
            </div>
            </>
        )
    }
    else{
        return <div style={{margin: "0 0 20vh 0"}} >Hey</div>

    }

}