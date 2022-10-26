import React, { useState } from "react";


export default function Scrambles() {

    let scrambles = []
    let moves = [
        ["R", "R2", "R'"],
        ["L", "L2", "L'"],
        ["F", "F2", "F'"],
        ["B", "B2", "B'"],
        ["U", "U2", "U'"],
        ["D", "D2", "D'"]
    ]

    let face = Math.floor(Math.random() * 6)
    for(let a = 0; a < 5; a++) {
        scrambles[a] = ""
        
            for(let i = 0; i < 26; i++) {

                if(i === 0) {
                    scrambles[a] = scrambles[a] + " " + moves[face][Math.floor(Math.random() * 3)]
                }
                else {
                    let newFace = Math.floor(Math.random() * 6)
                    while(newFace === face) {
                        newFace = Math.floor(Math.random() * 6)
                    }
                    face = newFace
                    scrambles[a] = scrambles[a] + " " + moves[newFace][Math.floor(Math.random() * 3)]
                }
            }
    }
    
    let scramblesRendered = []
    scramblesRendered = scrambles.map(scramble => {
        return (
            <div className="scrambleCase">
                <h1>{scramble}</h1>
            </div>
        )
    })

    return(
        <>
            {scramblesRendered}  
        </>
    )
}