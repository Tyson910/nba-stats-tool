import React, {useState} from 'react';
import SznStats from './SznStats';

export default function SelectPlayers({playerSearchResults}){

    const [selectedPlayers, setselectedPlayers] = useState([ ]);

    const handleChange = (evt) => {
        if (evt.target.checked){
            playerNumLimit(evt)
        }
        else{
            //removes players after checkbox unchecked
            setselectedPlayers( selectedPlayers.filter(playerID => playerID !== evt.target.value) ) ;
        }
    }
 function showSznTables(){
    if (selectedPlayers.length){
        return (
        <>
            {selectedPlayers.map( (player)=>  <SznStats player={player} /> )}
        </>
        )}
 }

 function playerNumLimit(evt){
     if (selectedPlayers.length === 5){
         alert("no more")
         evt.target.checked = false;
     }
     else if ( selectedPlayers.length < 6) {
        setselectedPlayers( oldSelectedPlayers => [...oldSelectedPlayers , (evt.target.value) ]  ); 
     }
 }


    if (playerSearchResults){
        return (
        <>
        <form className="pure-form pure-form-stacked">
            {playerSearchResults.map( (player) => ( 
                <PlayerCheckbox key={player.id} first_name={player.first_name}  
                id={player.id} last_name={player.last_name} teamAbbr={player.team.abbreviation} 
                position = {player.position}  
                onCheckChange = {(e) => handleChange(e)} /> ))}
        </form>
        {showSznTables()}
        </>
        )
    }
    else{
        return ""
    }

}

function PlayerCheckbox({id, first_name, last_name, position, teamAbbr, onCheckChange}){

        return(
            <label >
                <input type='checkbox'  value={id + '-' + first_name + '-' +last_name} onChange= { (e) => onCheckChange(e)} />
                {first_name} {last_name} - {teamAbbr} {position}
            </label>
        )
    
}

