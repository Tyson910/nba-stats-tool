import React from 'react';

export default function SznStatsTable({first_name, last_name, stats}){

  
    return (
        <table className='pure-table'>

            <caption>
                <p>{first_name} {last_name}</p> 
                <p> 2020- 21 Season Averages</p>
            </caption>

            <thead>
                <tr>
                    <th scope='col'>Games Played</th>
                    <th scope='col'>Points</th>
                    <th scope='col'>Rebounds</th>
                    <th scope='col'>Assists</th>
                    <th scope='col'>Steals</th>
                    <th scope='col'>Blocks</th>
                    <th scope='col'>Turnovers</th>
                    <th scope='col'>Field Goals Made</th>
                    <th scope='col'>Field Goals Attempted</th>
                    <th scope='col'>Field Goal Percentage (%)</th> 
                    <th scope='col'>Three Balls Made</th>
                    <th scope='col'>Three Balls Attemped</th>
                    <th scope='col'>Three Ball Percentage (%) </th>
                    <th scope='col'>Free Throws Made</th>
                    <th scope='col'>Free Throws Attempted</th>
                    <th scope='col'>Free Throw Percentage (%) </th>
                    <th scope='col'>Fantasy Points</th>
                </tr>
            </thead>
        {SznStatsTableBody(stats)}
        </table>

    )
}




function SznStatsTableBody({ast, blk, fgm, fga, fg_pct ,ftm, 
    fta, ft_pct, fg3a, fg3m, fg3_pct, pts, reb, stl, games_played, turnover}){

        function getFantasyScore(){
            let total = (fgm - fga) + (ftm - fta) + (ast - turnover ) + (reb + stl + blk + pts);
            return total;
        }
        return (
        <tbody>
        <tr>
            <td>{games_played}</td>
            <td>{pts}</td>
            <td>{reb}</td>
            <td>{ast}</td>
            <td>{stl}</td>
            <td>{blk}</td>
            <td>{turnover}</td>
            <td>{fgm}</td>
            <td>{fga}</td>
            <td>{(fg_pct * 100).toFixed(1)} </td>
            <td>{fg3m}</td>
            <td>{fg3a}</td>
            <td>{(fg3_pct * 100).toFixed(1)}</td>
            <td>{ftm}</td>
            <td>{fta}</td>
            <td>{(ft_pct * 100).toFixed(1)}</td>
            <td>{getFantasyScore().toFixed(1)}</td>
        </tr>
    </tbody>
        )

    }