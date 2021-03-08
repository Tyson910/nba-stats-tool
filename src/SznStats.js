import React, {useState, useEffect} from 'react';

export default function SznStats({player}){

    const [sznStats, setSznStats] = useState('');
    const [loading, setLoading] = useState(false);

    //fetches player info then adds it to state
    async function fetchSznStats(){
        setLoading(true);

        var API = "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=";
        let response = await fetch(API + player.id);
        let resultObj = await response.json();
        var dataArray = resultObj.data;
        setSznStats(dataArray[0]); 
        setLoading(false);  
    }

        useEffect(() => {
            fetchSznStats()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [] )


        if(sznStats && !loading){
            return SznStatsRow(sznStats, player.first_name,  player.last_name )  ;
        }
        else if(loading){
            return <tr><td>Loading plz give it a second :)</td></tr>
        }
        else{
            return <tr><td colSpan='8' rowSpan='2'>
            Sorry {player.first_name} {player.last_name} 
            2020-21 Stats couldn't be found please try again.  
            </td></tr>
        }
}


function SznStatsRow ({ast, blk, fgm, fga, fg_pct ,ftm, fta, ft_pct, fg3a, fg3m, fg3_pct, 
                            pts, reb, stl, games_played, turnover}, f_name, l_name){

    function getFantasyScore(){
        let total = (fgm - fga) + (ftm - fta) + (ast - turnover ) + (reb + stl + blk + pts);
        return total;
    }

    return(

        <tr key={f_name + l_name}>
            <th>{f_name}  {l_name}</th>
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
    )}