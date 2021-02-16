import React from 'react';

export default function SznStatsTable({first_name, last_name, stats}){

  
    return (
        <table className='pure-table'>

            <caption>
                <p>{first_name} {last_name}</p> 
                <p> 2020-21 Season Averages</p>
            </caption>

            <thead>
                <tr>
                    <th scope='col'>Games</th>
                    <th scope='col'>Pts</th>
                    <th scope='col'>Reb</th>
                    <th scope='col'>Assists</th>
                    <th scope='col'>Steals</th>
                    <th scope='col'>Blocks</th>
                    <th scope='col'>TO</th>
                    <th scope='col'>FGM</th>
                    <th scope='col'>FGA</th>
                    <th scope='col'>FG(%)</th> 
                    <th scope='col'>FG3M</th>
                    <th scope='col'>FG3A</th>
                    <th scope='col'>FG3(%) </th>
                    <th scope='col'>FTM</th>
                    <th scope='col'>FTA</th>
                    <th scope='col'>FT(%) </th>
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
            <td>{pts.toFixed(1)}</td>
            <td>{reb.toFixed(1)}</td>
            <td>{ast.toFixed(1)}</td>
            <td>{stl.toFixed(1)}</td>
            <td>{blk.toFixed(1)}</td>
            <td>{turnover.toFixed(1)}</td>
            <td>{fgm.toFixed(1)}</td>
            <td>{fga.toFixed(1)}</td>
            <td>{(fg_pct * 100).toFixed(1)} </td>
            <td>{fg3m.toFixed(1)}</td>
            <td>{fg3a.toFixed(1)}</td>
            <td>{(fg3_pct * 100).toFixed(1)}</td>
            <td>{ftm.toFixed(1)}</td>
            <td>{fta.toFixed(1)}</td>
            <td>{(ft_pct * 100).toFixed(1)}</td>
            <td>{getFantasyScore().toFixed(1)}</td>
        </tr>
    </tbody>
        )

    }