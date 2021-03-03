import React, {useState} from 'react';
import DateRange from './DateRange';
import SznStatsTable from './SznStatsTable';

export default function SelectPlayers({playerSearchResults}){

    const [selectedPlayers, setSelectedPlayers] = useState([ ]);

    function handleChange(evt, playerChecked){
        if (evt.target.checked){
            playerNumLimit(evt,playerChecked)
        }
        else{
            //removes players after checkbox unchecked
            setSelectedPlayers( selectedPlayers.filter(playerID => playerID !== playerChecked) ) ;
        }
    }
    //limits selected player to 5
    function playerNumLimit(evt,player){
        if (selectedPlayers.length === 5){
            alert("no more")
            evt.target.checked = false;
        }
        else if ( selectedPlayers.length < 6) {
            setSelectedPlayers( oldSelectedPlayers => [...oldSelectedPlayers , player ]  ); 
        }
    }

    //removes players after clicked on in Player list display
    const handleClick = (clickedPlayer) => {
        setSelectedPlayers(selectedPlayers.filter(playerID => playerID !== clickedPlayer))
        if( document.getElementById(clickedPlayer.id + 'cbox') ) {
            let playersCheckBox = document.getElementById(clickedPlayer.id + 'cbox');
            playersCheckBox.checked = false;
        }
    }
    
    if (playerSearchResults && selectedPlayers.length){
        return (
            <>
            <form className="pure-form pure-form-stacked flex-column" id="checkbox-form">
            {playerSearchResults.map( (player) => ( 
                <PlayerCheckbox  player={player} key={player.id}
                onCheckChange = {(e) => handleChange(e, player)} /> ))}
            </form>

            <nav id="player-list"><ul>
                {selectedPlayers.map( (player) => ( 
                        <PlayerListItem player={player} key={player.id}
                        handleClick = {() => handleClick(player)} /> ))}
            </ul></nav>

            <SznStatsTable playerArray={selectedPlayers} />
            <DateRange playerArray={selectedPlayers} />

            </>
        )
    }

    else if (playerSearchResults){
        return (
        <>
        <form className="pure-form pure-form-stacked flex-column" id="checkbox-form">
            {playerSearchResults.map( (player) => ( 
                <PlayerCheckbox key={player.id} player={player}
                onCheckChange = {(e) => handleChange(e, player)} /> ))}

        </form>
        </>
        )
    }

    else{
        return ""
    }

}

function PlayerCheckbox({player, onCheckChange}){

        return(
            <label >
                <input type='checkbox'  value={player.id} onChange= { (e) => onCheckChange(e, player)} id={player.id + 'cbox'} />

                {player.first_name} {player.last_name} - {player.team.abbreviation} {player.position}
            </label>
        )
}

function PlayerListItem({player, handleClick}){

    return(
        <li>
        {player.first_name} {player.last_name}  - {player.team.abbreviation} {player.position} 
            <span className="close" onClick = { () => {
                handleClick(player.id + 'cbox')
                }  }> x </span>
        </li>

    )
}