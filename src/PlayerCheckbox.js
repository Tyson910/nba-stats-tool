import React from 'react';

export default function SelectPlayers({id, first_name, last_name, position, teamAbbr}){

    return(
        
    <label key={id} >
        <input type='checkbox'  value={id}  />
        {first_name} {last_name} || {position} {teamAbbr}
    </label>

    )
}
