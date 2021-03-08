import React, {useState} from 'react';
import SelectPlayers from './SelectPlayers';

export default function PlayerSearch (){

    const [playerName, setPlayerName] = useState('');
    const [playerSearchResults, setPlayerSearchResults] = useState('');

    const handleChange = (evt) => {
        setPlayerName(evt.target.value);
    }

    const handleSumbit = (evt) => {
        evt.preventDefault();
        searchPlayerName(playerName);
    }

    //fetches player info then adds it to selectedPlayers Array
    async function searchPlayerName(name){
        var API = "https://www.balldontlie.io/api/v1/players?search=";
        if(name){
            let query = name.trim().split(' ').join('_');
            let response = await fetch(API + query + '&per_page=5');
            let resultObj = await response.json();
            var dataArray = resultObj.data;
            setPlayerSearchResults(dataArray);
        }
    }

    return ( 
        <>
        <form className="flex-column" id="search-form">
        <label className="flex-column">
        Player Name
        </label>
        <input type="text" value ={playerName} required onChange={e => handleChange(e)}/>
        <input className='pure-button' type="submit" value="Search" onClick={ e => handleSumbit(e)} />
        </form>
        <SelectPlayers playerSearchResults={playerSearchResults} />
        </>
    )
}


