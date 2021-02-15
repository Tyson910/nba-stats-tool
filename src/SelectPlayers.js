import React, {useState} from 'react';

export default function SelectPlayers({playerSearchResults}){

    const [selectedPlayers, setselectedPlayers] = useState([ ]);

    const handleChange = (evt) => {
        if (evt.target.checked){
            setselectedPlayers( oldSelectedPlayers => [...oldSelectedPlayers , (evt.target.value) ]  )
        }
        else{
            //returns array after removing players name after checkbox unchecked
            setselectedPlayers( selectedPlayers.filter(playerID => playerID !== evt.target.value) ) ;
        }
    }

    if (playerSearchResults){
        return <form className="pure-form pure-form-stacked">
            {playerSearchResults.map( (player) => ( 
                <PlayerCheckbox key={player.id} first_name={player.first_name}  
                id={player.id} last_name={player.last_name} teamAbbr={player.team.abbreviation} 
                position = {player.position}  
                onCheckChange = {(e) => handleChange(e)} /> ))}
        </form>
    }
    else{
        return ""
    }

}

function PlayerCheckbox({id, first_name, last_name, position, teamAbbr, onCheckChange}){

    return(
        <label >
            <input type='checkbox'  value={id} onChange= { (e) => onCheckChange(e)} />
            {first_name} {last_name} || {position} {teamAbbr}
        </label>
    )
}

