import React, {useState, useEffect } from 'react';
// import PlayerCheckbox from './PlayerCheckbox';


export default function SelectPlayers({playerSearchResults}){

    const [selectedPlayers, setselectedPlayers] = useState('');

    const handleChange = (evt) => {
        console.log(evt.target.value)
        setselectedPlayers(evt.target.value)
    }

    if (playerSearchResults){
        return <form className="pure-form pure-form-stacked">
            {playerSearchResults.map( (player) => ( 
                <PlayerCheckbox key={player.id} first_name={player.first_name}  
                id={player.id} last_name={player.last_name} teamAbbr={player.team.abbreviation} 
                position = {player.position}  
                onSChange = {(e) => handleChange(e)} /> ))}
        </form>
    }
    else{
        return ""
    }

}

function PlayerCheckbox({id, first_name, last_name, position, teamAbbr, onSChange}){

    return(
        
    <label key={id} >
        <input type='checkbox'  value={id} onChange= { (e) => onSChange(e)} />
        {first_name} {last_name} || {position} {teamAbbr}
    </label>

    )
}

