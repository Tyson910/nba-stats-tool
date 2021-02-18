import React, {useState} from 'react';
import SznStats from './SznStats';
import DateRange from './DateRange';
import SznStatsHead from './SznStatsTable';

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
                <SznStatsHead playerArray={selectedPlayers} />

                <nav><ul>
                {selectedPlayers.map( (player) => ( 
                        <PlayerListItem key={player} id={player.split('-')[0]} 
                        first_name={player.split('-')[1]}  last_name={player.split('-')[2]} 
                        position = {player.split('-')[3]} teamAbbr={player.split('-')[4]} 
                        onClickChange = {(e) => handleChange(e)} /> ))}
                </ul></nav>
            </>
            )}
    }
//limits selected player to 5
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
        <DateRange playerArray={selectedPlayers} />
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
                <input type='checkbox'  value={id + '-' + first_name + '-' +last_name + '-' + position + '-' + teamAbbr}  
                onChange= { (e) => onCheckChange(e)} />
                {first_name} {last_name} - {teamAbbr} {position}
            </label>
        )
    
}

function PlayerListItem({id, first_name, last_name, position, teamAbbr, onClickChange}){

    return(
        <li>
        {first_name} {last_name}  - {teamAbbr} {position} 
            <span className="close" onClick = { () => console.log(id + '-' + first_name + '-' +last_name)}> x </span>
        </li>

    )
}