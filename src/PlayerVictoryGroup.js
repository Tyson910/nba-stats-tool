import React, {useState, useEffect, useRef} from 'react';
import {VictoryLine, VictoryGroup, VictoryScatter} from 'victory';



export default function PlayerVictoryGroup({color, statsArray, category}) {

    if (category === "fantasy score"){
        const getFantasyScore = ({ast, blk, fgm, fga, ftm, fta, pts, reb, stl, turnover}) => (
            (fgm - fga) + (ftm - fta) + (ast - turnover ) + (reb + stl + blk + pts)
        )
        return (
            <VictoryGroup color={color}>
                            
                    <VictoryLine
                        y={(d) => getFantasyScore(d)}
                        x={(d) => new Date( d.game.date)}
                        data={statsArray}
                        />
    
                    <VictoryScatter
                        size={3}
                        data={statsArray}
                        y={(d) => getFantasyScore(d)}
                        x={(d) => new Date( d.game.date)}
                    />
            </VictoryGroup>
        )
    }
    else{

        return (

            <VictoryGroup color={color}>
                            
                    <VictoryLine
                        y={category}
                        x={(d) => new Date( d.game.date)}
                        data={statsArray}
                        />
    
                    <VictoryScatter
                        size={3}
                        data={statsArray}
                        y={category}
                        x={(d) => new Date( d.game.date)}
                    />
                    
            </VictoryGroup>
    
            )

    }
}


