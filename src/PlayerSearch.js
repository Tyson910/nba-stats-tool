import React, {useState, useEffect } from 'react';
import SelectPlayers from './SelectPlayers';

export default function PlayerSearch (){


    const [playerName, setPlayerName] = useState('');
    // const playersArray = [ ];

    const handleSumbit = (evt) => {
        evt.preventDefault();
        console.log({playerName});
        // SearchPlayerName(playerName)
        // console.log({playersArray})
       // console.log( SearchPlayerName(playerName)) ;
    }

    return ( 
        <form className="pure-form">
        <label>
        Player Name
        <input type="text" value ={playerName} onChange={e => setPlayerName(e.target.value)}/>
        </label>
        <input className='pure-button' type="submit" value="Search" onClick={ e => handleSumbit(e)} />
        </form>
    )
}

var API = "https://www.balldontlie.io/api/v1/players?search=";
//fetches player info then adds it to selectedPlayers Array
async function SearchPlayerName(name){
    if(name){
        let query = name.trim().split(' ').join('_');
        console.log(query);
        let response = await fetch(API + query + '&per_page=5');
        let resultObj = await response.json();
        var dataArray = resultObj.data;
        console.log(dataArray);
       // playersArray.push(dataArray);
        
    //return dataArray;
       // checkResults(dataArray);
    }
}