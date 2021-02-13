import React, {useState, useEffect } from 'react';
import SelectPlayers from './SelectPlayers';

export default function PlayerSearch (){

    const [playerName, setPlayerName] = useState('');
    const [playerSearchResults, setPlayerSearchResults] = useState('');

    //fetches player info then adds it to selectedPlayers Array
    async function searchPlayerName(name){
        var API = "https://www.balldontlie.io/api/v1/players?search=";
        if(name){
            let query = name.trim().split(' ').join('_');
            console.log(query);
            let response = await fetch(API + query + '&per_page=5');
            let resultObj = await response.json();
            var dataArray = resultObj.data;
            console.log(dataArray);
            setPlayerSearchResults(dataArray);
            console.log({playerSearchResults});
        }
    }
    

    const handleChange = (evt) => {
        setPlayerName(evt.target.value);
    }

    const handleSumbit = (evt) => {
        evt.preventDefault();
        console.log({playerName});
        searchPlayerName(playerName);
    }

    return ( 
        <form className="pure-form">
        <label>
        Player Name
        <input type="text" value ={playerName} required onChange={e => handleChange(e)}/>
        </label>
        <input className='pure-button' type="submit" value="Search" onClick={ e => handleSumbit(e)} />
        </form>
    )
}


