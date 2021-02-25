import React, {useState} from 'react';
import {VictoryChart, VictoryAxis, VictoryLine, VictoryGroup, VictoryScatter} from 'victory';


export default function StatsChart({allStatsArray}){

    const [statCategory, setStatCategory] = useState('fantasy score');
    const colorArray = ["gold", "green", "blue", "Magenta", "black" ];
    const categoryArray = [  "fantasy score" ,"min", "pts", "reb", "oreb", "dreb", "ast", "stl", "blk", "fgm", "fga", "fg_pct",
    "fg3m","fg3a", "fg3_pct", "ftm", "fta",  "ft_pct", "turnover",];
    const chartTheme = {
        axis: {
          style: {
            tickLabels: {
              // this changed the color of my numbers to white
              fill: 'white',
              padding: 7
            },
            grid: {
                stroke: 'white', //CHANGE COLOR OF GRID LINES
                strokeDasharray: '1',
              },
              axis: {
                stroke: 'white'  //CHANGE COLOR OF Y-AXIS
              },
          },
        },
      };
    //returns date in 'Jan 1' format for x axis ticks
    function createPrettyGraphDate( uglyDate ){
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec" ];
        return months[uglyDate.getMonth()] +  ' ' + uglyDate.getDate();
    }

    return (
        <>
      <select onChange={(e)=>setStatCategory(e.target.value)}>
      {categoryArray.map( category => {
        if (category === "fantasy score"){
          return <option key={category} value={category} defaultValue >{category}</option>
        }
        else{
          return <option key={category} value={category} >{category}</option>
        }
      })}
      </select>

      <div>
      {allStatsArray.map( (playerStats, i) => (
          <Legend key={playerStats[0].player.id} color={colorArray[i]}
          name={playerStats[0].player.first_name + ' ' + playerStats[0].player.last_name} />
          ))} 
      </div>


        <div id="VictoryChart">
        <VictoryChart theme={chartTheme} domainPadding={10}   >

        <VictoryAxis tickFormat={(x) => createPrettyGraphDate(new Date(x)) }  padding={{ top: 100 }}/>
        <VictoryAxis dependentAxis />

        {allStatsArray.map( (playerStats, i) => {
          if (statCategory === "fantasy score"){
          const getFantasyScore = ({ast, blk, fgm, fga, ftm, fta, pts, reb, stl, turnover}) => (
              (fgm - fga) + (ftm - fta) + (ast - turnover ) + (reb + stl + blk + pts)
          )
          return (
              <VictoryGroup color={colorArray[i]}>
                              
                      <VictoryLine
                          y={(d) => getFantasyScore(d)}
                          x={(d) => new Date( d.game.date)}
                          data={playerStats}
                          />
      
                      <VictoryScatter
                          size={3}
                          data={playerStats}
                          y={(d) => getFantasyScore(d)}
                          x={(d) => new Date( d.game.date)}
                      />
              </VictoryGroup>
          )}
          else if (statCategory === "min"){
          return (
              <VictoryGroup color={colorArray[i]}>
                              
                      <VictoryLine
                          y={(d) => Number( d.min.slice(0,2))}
                          x={(d) => new Date( d.game.date)}
                          data={playerStats}
                          />
      
                      <VictoryScatter
                          size={3}
                          data={playerStats}
                          y={(d) => Number( d.min.slice(0,2) )}
                          x={(d) => new Date( d.game.date)}
                      />
              </VictoryGroup>
          )}
          else{
    return (
        <VictoryGroup color={colorArray[i]}>
                      
                <VictoryLine
                    y={statCategory}
                    x={(d) => new Date( d.game.date)}
                    data={playerStats}
                    />

                <VictoryScatter
                    size={3}
                    data={playerStats}
                    y={statCategory}
                    x={(d) => new Date( d.game.date)}
                /> 
        </VictoryGroup>
        )}          
          })}
        </VictoryChart>
        </div>
    </>
    )
}

const Legend = ({name, color}) => (
    <div>
    <svg height="40" width="40">
    <circle cx="20" cy="20" r="8" stroke="black" strokeWidth="3" fill={color} />
    Sorry, your browser does not support inline SVG.  Please Change browsers to view chart legend
    </svg> 
        {name}
    </div>
)

