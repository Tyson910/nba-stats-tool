import React from 'react';


export default function RecentStatsTable({first_name, last_name, start_date, end_date, statsArray}){

    return (
        <table className='pure-table pure-table-bordered pure-table-striped'>

            <caption>
                <p>{first_name} {last_name}</p> 
                <p> Games Between {start_date} and {end_date} </p>
            </caption>

            <thead>
                <tr>
                    <th scope='col'>Game Date</th>
                    <th scope='col'>Min</th>
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
                    <th scope='col'>Fantasy</th>
                </tr>
            </thead>
            <tbody>
                {statsArray.map( (stats) => RecentStatsTableBody(stats) )}
            </tbody>
        </table>

    )
}

function RecentStatsTableBody({ast, blk, fgm, fga, fg_pct ,ftm, 
    fta, ft_pct, fg3a, fg3m, fg3_pct, pts, reb, stl, game, turnover, min}){

        let prettyGameDate = () => {
            let newDate = game.date.slice(0,10).split("-");
            return newDate[1] + '-' + newDate[2] +  '-' + newDate[0]
        }
        if(!min){
            min = "DNP";
        }

        function getFantasyScore(){
            let total = (fgm - fga) + (ftm - fta) + (ast - turnover ) + (reb + stl + blk + pts);
            return total;
        }
        return (
        <tr key={game.date}>
            <td>{prettyGameDate()}</td>
            <td>{min}</td>
            <td>{pts}</td>
            <td>{reb}</td>
            <td>{ast}</td>
            <td>{stl}</td>
            <td>{blk}</td>
            <td>{turnover}</td>
            <td>{fgm}</td>
            <td>{fga}</td>
            <td>{fg_pct} </td>
            <td>{fg3m}</td>
            <td>{fg3a}</td>
            <td>{fg3_pct }</td>
            <td>{ftm}</td>
            <td>{fta}</td>
            <td>{ft_pct}</td>
            <td>{getFantasyScore()}</td>
        </tr>
        )

    }