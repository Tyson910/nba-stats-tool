import React from 'react';
import SznStats from './SznStats';

export default function SznStatsHead({playerArray}){

    return (
        <table className='pure-table pure-table-bordered pure-table-striped'>

            <caption>
                2020-21 Season Averages
            </caption>

            <thead>
                <tr>
                    <th scope='col'>First Name</th>
                    <th scope='col'>Last Name</th>
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
            <tbody>
                {playerArray.map( (player) => <SznStats player={player}  />)}
            </tbody>
        </table>
    )
}