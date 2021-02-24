import React, {useState, useEffect, useRef} from 'react';
import RecentStatsTable from './RecentStatsTable';
import {VictoryLine, VictoryChart, VictoryTheme, VictoryGroup, VictoryScatter, VictoryAxis} from 'victory';

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
    //returns date in 'Jan 1, 2021' format for table header
    function createPrettyGraphDate( uglyDate ){
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        return months[uglyDate.getMonth()] +  ' ' + uglyDate.getDate();
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

        const chartTheme = {
            axis: {
              style: {
                tickLabels: {
                  // this changed the color of my numbers to white
                  fill: 'white',
                  padding: 7
                },
                grid: {
                    stroke: 'white', //CHANGE COLOR OF Y-AXIS GRID LINES
                    strokeDasharray: '5',
                  },
                  axis: {
                    stroke: 'white'  //CHANGE COLOR OF Y-AXIS
                  },
              },
            },
          };
const colorArray = ["green", "pink", "blue", "darkorange"];

const getFantasyScore = ({ast, blk, fgm, fga, ftm, fta, pts, reb, stl, turnover}) => (
    (fgm - fga) + (ftm - fta) + (ast - turnover ) + (reb + stl + blk + pts)
)

        return (
        
            <>
            {statsArray.map( (stats) => <RecentStatsTable statsArray={stats} key={stats[0].player.id}
                first_name={stats[0].player.first_name} last_name={stats[0].player.last_name}
                start_date = {createPrettyDate(start_date)} end_date = {createPrettyDate(end_date)} />
            )}


<div id="VictoryContainer">

<div>

    <svg height="40" width="40">
    <circle cx="20" cy="20" r="8" stroke="black" strokeWidth="3" fill={colorArray[0]} />
    Sorry, your browser does not support inline SVG.  Please Change browsers to view chart legend
    </svg> 

            Player One

</div>

<div>
<svg height="40" width="40">
    <circle cx="20" cy="20" r="8" stroke="black" strokeWidth="3" fill={colorArray[1]} />
    Sorry, your browser does not support inline SVG.  
    </svg> 
            Player Two
</div>

<VictoryChart theme={chartTheme} id="VictoryContainer"
        domainPadding={10}   >


<VictoryAxis
      tickFormat={(x) => createPrettyGraphDate(new Date(x)) }
  />

<VictoryAxis dependentAxis

 />


<VictoryGroup
  colorScale={"qualitative"}
  color="blue">
                
        <VictoryLine

            y={"ast"}
            x={(d) => new Date( d.game.date)}
                data={statsArray[0]}
            />

                <VictoryScatter
                    size={3}
                    data={statsArray[0]}
                    y={"ast"}
                    x={(d) => new Date( d.game.date)}
                />

        </VictoryGroup>
        <VictoryGroup color="green">
        <VictoryLine
                y={(d) => d.reb}
                x={(d) => new Date( d.game.date)}
                    data={statsArray[0]}
                />

        <VictoryScatter
                    size={3}
                    data={statsArray[0]}
                    y={"reb"}
                    x={(d) => new Date( d.game.date)}
                />

        </VictoryGroup>

        <VictoryGroup color="darkorange">
                            
            <VictoryLine
                y={(d) => getFantasyScore(d)}
                x={(d) => new Date( d.game.date)}
                data={statsArray[0]}
                />

            <VictoryScatter
                size={3}
                data={statsArray[0]}
                y={(d) => getFantasyScore(d)}
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
