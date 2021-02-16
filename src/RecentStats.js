import React, {useState, useEffect} from 'react';


export default function SznStats({player, start_date, end_date}){
//props is formatted as "000-first_name-last_name"
//to access properties we split into array by - and access index number
//[0] is player id
//[1] is first name
//[2] is last name
/*
    function cleanDateInput(uglyDate){
     return uglyDate.toString().split(" ").slice(1,4)  
    }
<RecentStatsTable statsArray={stats} 
first_name={player.split("-")[1]} last_name={player.split("-")[2]} />
map thru stats array and create new row w each game
<RecentStatsTableBody stats = {statsArray} />
*/
    const [stats, setStats] = useState([ ]);
    const [loading, setLoading] = useState(false);

    //fetches player info then adds it to state
    async function fetchStats(){
        setLoading(true);
        var API = `https://www.balldontlie.io/api/v1/stats/?start_date=${start_date}&end_date=${end_date}&player_ids[]=`;

        let playerID = player.split("-")[0];
        let response = await fetch(API + playerID);
        let resultObj = await response.json();
        var dataArray = resultObj.data;
        setStats(dataArray); 
        setLoading(false);  
    }

        useEffect(() => {
            fetchStats()
        }, [] )

        return <div>Hey</div>
}