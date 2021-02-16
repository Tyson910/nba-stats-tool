import React, {useState, useEffect} from 'react';
import SznStatsTable from './SznStatsTable';

export default function SznStats({player}){
//props is formatted as "000-first_name-last_name"
//to access properties we split into array by - and access index number
//[0] is player id
//[1] is first name
//[2] is last name

    const [sznStats, setSznStats] = useState('');
    //const {loading, setLoading} = useState(false);

    //fetches player info then adds it to state
    async function fetchSznStats(){
        var API = "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=";

        let playerID = player.split("-")[0];
        let response = await fetch(API + playerID);
        let resultObj = await response.json();
        var dataArray = resultObj.data;
        setSznStats(dataArray[0]);   
    }

        useEffect(() => {
            fetchSznStats()
        }, [] )

        if(sznStats){
            return <SznStatsTable first_name={player.split("-")[1]} 
            last_name={player.split("-")[2]} stats={sznStats} />
        }
        else{
            return <div>Sorry {player.split("-")[1]} {player.split("-")[2]} 
            2020-21 Stats couldn't be found please try again. </div>
        }

}
    


